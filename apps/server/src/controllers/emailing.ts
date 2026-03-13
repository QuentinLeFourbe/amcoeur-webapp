import type { EmailBlock, EmailCampaignDto, EmailImageBlock } from "@amcoeur/types";
import { EmailBlockType } from "@amcoeur/types";
import type { Request, Response } from "express";
import fs from "fs";
import Papa from "papaparse";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

import Contact from "../models/contact.js";
import Unsubscribe from "../models/unsubscribe.js";
import { generateEmailHtml } from "../services/emailGeneratorService.js";
import { processEmailImage } from "../services/imageProcessingService.js";
import { createSyncJob, getSyncJob, updateSyncJob } from "../services/jobService.js";
import {
  addSubscriberToMailingList,
  getMailingListSubscribers,
  removeFromMailingList,
} from "../services/mailingListService.js";
import { sendEmail } from "../services/mailService.js";
import { invalidateCache } from "../services/redisService.js";
import { logger } from "../utils/logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Send an email campaign to the target list or test email
 */
export const sendCampaign = async (req: Request, res: Response) => {
  try {
    const campaignData = JSON.parse(req.body.campaign) as EmailCampaignDto;
    const files = req.files as Express.Multer.File[];
    
    const attachments: { filename: string; path: string; cid: string }[] = [];
    
    // 1. Ajouter le logo Amcoeur
    const logoPath = path.join(__dirname, "..", "..", "assets", "amcoeur_logo.jpg");
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "amcoeur_logo.jpg",
        path: logoPath,
        cid: "logo_amcoeur"
      });
    }

    // 2. Traiter les blocs et les images séquentiellement
    let fileIndex = 0;
    const processedBlocks: EmailBlock[] = [];

    for (const block of campaignData.blocks) {
      if (block.type === EmailBlockType.IMAGE) {
        const imagesCount = block.images.length;
        const targetWidth = Math.floor(600 / imagesCount);
        const processedImages: EmailImageBlock['images'] = [];

        for (const img of block.images) {
          if (files && files[fileIndex]) {
            const currentFile = files[fileIndex] as Express.Multer.File;
            const processed = await processEmailImage(currentFile, targetWidth);
            const bIndex = processedBlocks.length;
            const iIndex = processedImages.length;
            
            attachments.push({
              filename: `image_${bIndex}_${iIndex}.jpg`,
              path: processed.path,
              cid: `img_b${bIndex}_i${iIndex}`
            });

            processedImages.push({ ...img, url: processed.url });
            fileIndex++;
          } else {
            processedImages.push(img);
          }
        }
        processedBlocks.push({ ...block, images: processedImages });
      } else {
        processedBlocks.push(block);
      }
    }

    // 3. Définir le destinataire
    const target = campaignData.targetEmail || process.env.NEWSLETTER_TARGET_EMAIL;
    if (!target) {
      return res.status(400).send("Destinataire manquant (NEWSLETTER_TARGET_EMAIL non défini)");
    }

    // 4. Envoyer l'email
    const unsubscribeEmail = campaignData.targetEmail || "contact@amcoeur.org";
    const contactEmail = process.env.CONTACT_EMAIL || "contactinfo@amcoeur.org";
    const html = await generateEmailHtml(processedBlocks, unsubscribeEmail, contactEmail);

    await sendEmail({
      to: target,
      subject: campaignData.subject,
      html: html,
      attachments: attachments as unknown as { filename: string; content: Buffer; cid: string }[],
    });

    return res.status(200).json({ message: "Campagne envoyée avec succès", target });
  } catch (err) {
    logger.error("Error in sendCampaign:", err);
    return res.status(500).send("Erreur lors de l'envoi de la campagne");
  }
};

/**
 * Force refresh the mailing list cache and return new stats
 */
export const refreshMailingList = async (_req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = process.env.OVH_MAILING_LIST || "amcoeur";
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
    logger.error("Error in refreshMailingList:", err);
    return res.status(500).send("Erreur lors du rafraîchissement de la liste");
  }
};

/**
 * Remove a single subscriber from the mailing list
 */
export const removeSubscriber = async (req: Request, res: Response) => {
  try {
    const email = String(req.params.email || "");
    if (!email) {
      return res.status(400).send("Email manquant");
    }

    const domain = "amcoeur.org";
    const mailingList = process.env.OVH_MAILING_LIST || "amcoeur";

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
    logger.error("Error in removeSubscriber:", err);
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
    logger.error("Error in exportUnsubscribes:", err);
    return res.status(500).send("Erreur lors de l'exportation des désinscriptions");
  }
};

/**
 * Export current OVH subscribers as CSV
 */
export const exportOVHList = async (_req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = process.env.OVH_MAILING_LIST || "amcoeur";

    const subscribers = await getMailingListSubscribers(domain, mailingList);
    
    const csvData = subscribers.map(email => ({ email }));
    const csv = Papa.unparse(csvData, { delimiter: ";" });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=liste_ovh_${mailingList}.csv`);
    return res.status(200).send(csv);
  } catch (err) {
    logger.error("Error in exportOVHList:", err);
    return res.status(500).send("Erreur lors de l'exportation de la liste OVH");
  }
};

/**
 * Get statistics for mailing list and local database
 */
export const getMailingListStats = async (_req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = process.env.OVH_MAILING_LIST || "amcoeur";

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
    logger.error("Error in getMailingListStats:", err);
    return res.status(500).send("Erreur lors de la récupération des statistiques");
  }
};

/**
 * Get the status of a synchronization job
 */
export const getSyncStatus = async (req: Request, res: Response) => {
  try {
    const jobId = String(req.params.jobId || "");
    
    if (!jobId) {
      return res.status(400).send("Job ID manquant");
    }

    const job = await getSyncJob(jobId);
    
    if (!job) {
      return res.status(404).send("Job non trouvé");
    }

    return res.status(200).json(job);
  } catch (err) {
    logger.error("Error in getSyncStatus:", err);
    return res.status(500).send("Erreur lors de la récupération du statut");
  }
};

/**
 * Synchronize local database with OVH mailing list
 */
export const syncWithOVH = async (req: Request, res: Response) => {
  try {
    const domain = "amcoeur.org";
    const mailingList = process.env.OVH_MAILING_LIST || "amcoeur";
    const dryRun = req.query.dryRun === "true";

    logger.info(`Starting ${dryRun ? "sync preview" : "sync"} for domain: ${domain}, list: ${mailingList}`);
    
    const contacts = await Contact.find();
    
    const unsubscribes = await Unsubscribe.find().select("email");
    const unsubscribedEmails = new Set(unsubscribes.map(u => u.email.toLowerCase().trim()));

    const currentOVHSubscribers = await getMailingListSubscribers(domain, mailingList);
    const ovhEmails = new Set(currentOVHSubscribers.map(e => e.toLowerCase().trim()));

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return emailRegex.test(email);
    };

    const ignoredContacts = contacts.filter(c => 
      unsubscribedEmails.has(c.email.toLowerCase().trim())
    );
    const ignoredUnsubscribedCount = ignoredContacts.length;

    const activeLocalContacts = contacts.filter(c => {
      const email = c.email.toLowerCase().trim();
      return !unsubscribedEmails.has(email) && isValidEmail(email);
    });

    const alreadyInOvhCount = activeLocalContacts.filter(c => 
      ovhEmails.has(c.email.toLowerCase().trim())
    ).length;

    const toAdd = activeLocalContacts.filter(c => 
      !ovhEmails.has(c.email.toLowerCase().trim())
    );

    const toRemove = currentOVHSubscribers.filter(email => 
      unsubscribedEmails.has(email.toLowerCase().trim())
    );

    if (dryRun) {
      return res.status(200).json({
        message: "Aperçu de la synchronisation",
        summary: {
          toAddCount: toAdd.length,
          toRemoveCount: toRemove.length,
          ignoredUnsubscribedCount,
          alreadyInOvhCount,
        }
      });
    }

    const totalActions = toAdd.length + toRemove.length;
    const jobId = uuidv4();
    await createSyncJob(jobId, totalActions);

    (async () => {
      try {
        await updateSyncJob(jobId, { status: "processing" });
        let added = 0;
        let removed = 0;
        let errors = 0;
        let processed = 0;

        for (const contact of toAdd) {
          try {
            await addSubscriberToMailingList(domain, mailingList, contact.email);
            added++;
          } catch (error) {
            logger.error(`Sync error (ADD) for ${contact.email}:`, error);
            errors++;
          } finally {
            processed++;
            if (processed % 5 === 0 || processed === totalActions) {
              await updateSyncJob(jobId, { processed, added, errors });
            }
          }
        }

        for (const email of toRemove) {
          try {
            await removeFromMailingList(domain, mailingList, email);
            removed++;
          } catch (error) {
            logger.error(`Sync error (REMOVE) for ${email}:`, error);
            errors++;
          } finally {
            processed++;
            if (processed % 5 === 0 || processed === totalActions) {
              await updateSyncJob(jobId, { processed, added, errors, removed });
            }
          }
        }

        await updateSyncJob(jobId, { status: "completed", processed, added, errors, removed });
        logger.info(`Sync job ${jobId} completed: ${added} added, ${removed} removed, ${errors} errors.`);
      } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Fatal error in sync job ${jobId}:`, error);
        await updateSyncJob(jobId, { status: "failed", error: error.message });
      }
    })();

    return res.status(202).json({
      message: "Synchronisation lancée en arrière-plan",
      jobId,
    });
  } catch (err) {
    logger.error("Error in syncWithOVH:", err);
    return res.status(500).send("Erreur lors de la synchronisation");
  }
};
