import { EmailBlockType } from "@amcoeur/types";
import type { EmailCampaignDto } from "@amcoeur/types";
import type { Request, Response } from "express";
import Papa from "papaparse";

import Contact from "../models/contact.js";
import Unsubscribe from "../models/unsubscribe.js";
import {
  addSubscriberToMailingList,
  getMailingListSubscribers,
  removeFromMailingList,
} from "../services/mailingListService.js";
import { invalidateCache } from "../services/redisService.js";
import { generateEmailHtml } from "../services/emailGeneratorService.js";
import { sendEmail } from "../services/mailService.js";
import { processEmailImage } from "../services/imageProcessingService.js";

/**
 * Send an email campaign to the target list or test email
 */
export const sendCampaign = async (req: Request, res: Response) => {
  try {
    const campaignData = JSON.parse(req.body.campaign) as EmailCampaignDto;
    const files = req.files as Express.Multer.File[];
    const attachments: { filename: string; path: string; cid: string }[] = [];
    
    // 1. Traiter les images et préparer les attachments CID
    let fileIndex = 0;
    const processedBlocks = await Promise.all(campaignData.blocks.map(async (block, bIndex) => {
      if (block.type === EmailBlockType.IMAGE) {
        const imagesCount = block.images.length;
        const targetWidth = Math.floor(600 / imagesCount);
        
        const processedImages = await Promise.all(block.images.map(async (img, iIndex) => {
          if (files && files[fileIndex]) {
            const processed = await processEmailImage(files[fileIndex] as Express.Multer.File, targetWidth);
            const cid = `img_b${bIndex}_i${iIndex}`;
            
            // Ajouter aux pièces jointes Nodemailer
            attachments.push({
              filename: `image_${bIndex}_${iIndex}.webp`,
              path: processed.path,
              cid: cid
            });

            fileIndex++;
            return { ...img, url: processed.url };
          }
          return img;
        }));
        
        return { ...block, images: processedImages };
      }
      return block;
    }));

    // 2. Définir le destinataire
    const target = campaignData.targetEmail || process.env.NEWSLETTER_TARGET_EMAIL;
    if (!target) {
      return res.status(400).send("Destinataire manquant (NEWSLETTER_TARGET_EMAIL non défini)");
    }

    // 3. Envoyer l'email avec les attachments CID
    const unsubscribeEmail = campaignData.targetEmail || "contact@amcoeur.org";
    const contactEmail = process.env.CONTACT_EMAIL || "contactinfo@amcoeur.org";
    const html = await generateEmailHtml(processedBlocks as any, unsubscribeEmail, contactEmail);

    await sendEmail({
      to: target,
      subject: campaignData.subject,
      html: html,
      attachments: attachments as any, // On passe les images embarquées
    });

    return res.status(200).json({ message: "Campagne envoyée avec succès", target });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de l'envoi de la campagne");
  }
};

/**
 * Force refresh the mailing list cache and return new stats
 */
export const refreshMailingList = async (_req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = "amcoeur";
    const cacheKey = `ml_subscribers_${domain}_${mailingList}`;

    await invalidateCache(cacheKey);

    const [ovhSubscribers, dbUnsubscribesCount, dbContactsCount] = await Promise.all([
      getMailingListSubscribers(domain, mailingList),
      Unsubscribe.countDocuments(),
      Contact.countDocuments(),
    ]);

    return res.status(200).json({
      ovh: {
        count: ovhSubscribers.length,
        name: mailingList,
        emails: ovhSubscribers,
      },
      db: {
        contactsCount: dbContactsCount,
        unsubscribesCount: dbUnsubscribesCount,
      }
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors du rafraîchissement de la liste");
  }
};

/**
 * Remove a single subscriber from the mailing list
 */
export const removeSubscriber = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).send("Email manquant");
    }

    const domain = "amcoeur.org";
    const mailingList = "amcoeur";

    await removeFromMailingList(domain, mailingList, email);

    await Unsubscribe.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { 
        $set: { 
          unsubscribedAt: new Date(),
          sentToAdmin: false
        } 
      },
      { upsert: true }
    );

    return res.status(200).send("Abonné supprimé et enregistré comme désinscrit");
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de la suppression de l'abonné");
  }
};

/**
 * Export unsubscribed emails as CSV
 */
export const exportUnsubscribes = async (_req: Request, res: Response) => {
  try {
    const unsubscribes = await Unsubscribe.find().sort({ unsubscribedAt: -1 });
    
    const csvData = unsubscribes.map(u => ({
      email: u.email,
      date: u.unsubscribedAt.toISOString(),
    }));

    const csv = Papa.unparse(csvData, { delimiter: ";" });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=desinscriptions.csv");
    return res.status(200).send(csv);
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de l'exportation des désinscriptions");
  }
};

/**
 * Get statistics for mailing list and local database
 */
export const getMailingListStats = async (_req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = "amcoeur";

    const [ovhSubscribers, dbUnsubscribesCount, dbContactsCount] = await Promise.all([
      getMailingListSubscribers(domain, mailingList),
      Unsubscribe.countDocuments(),
      Contact.countDocuments(),
    ]);

    return res.status(200).json({
      ovh: {
        count: ovhSubscribers.length,
        name: mailingList,
        emails: ovhSubscribers,
      },
      db: {
        contactsCount: dbContactsCount,
        unsubscribesCount: dbUnsubscribesCount,
      }
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de la récupération des statistiques");
  }
};

/**
 * Synchronize local database with OVH mailing list
 */
export const syncWithOVH = async (_req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = "amcoeur";

    const contacts = await Contact.find();
    
    const unsubscribes = await Unsubscribe.find().select("email");
    const unsubscribedEmails = new Set(unsubscribes.map(u => u.email.toLowerCase()));

    const currentOVHSubscribers = await getMailingListSubscribers(domain, mailingList);
    const ovhEmails = new Set(currentOVHSubscribers.map(e => e.toLowerCase()));

    const toAdd = contacts.filter(c => {
      const email = c.email.toLowerCase();
      return !unsubscribedEmails.has(email) && !ovhEmails.has(email);
    });

    const summary = { added: 0, skipped: toAdd.length, errors: 0 };
    
    for (const contact of toAdd) {
      try {
        await addSubscriberToMailingList(domain, mailingList, contact.email);
        summary.added++;
      } catch (error) {
        res.locals.logger.error(error);
        summary.errors++;
      }
    }

    return res.status(200).json({
      message: "Synchronisation terminée",
      summary: {
        added: summary.added,
        ignored_unsubscribed: unsubscribedEmails.size,
        already_in_ovh: ovhEmails.size,
        errors: summary.errors
      }
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de la synchronisation");
  }
};
