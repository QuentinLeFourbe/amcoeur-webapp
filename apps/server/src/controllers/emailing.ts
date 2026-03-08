import type { Request, Response } from "express";
import Papa from "papaparse";

import Contact from "../models/contact.js";
import Unsubscribe from "../models/unsubscribe.js";
import {
  addSubscriberToMailingList,
  getMailingListSubscribers,
  removeFromMailingList,
} from "../services/mailingListService.js";

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

    return res.status(200).send("Abonné supprimé");
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
