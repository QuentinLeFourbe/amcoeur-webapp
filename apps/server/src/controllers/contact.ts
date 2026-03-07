import type { ContactImportData } from "@amcoeur/types";
import type { Request, Response } from "express";
import fs from "fs";
import Papa from "papaparse";
import * as XLSX from "xlsx";

import Contact from "../models/contact.js";
import Unsubscribe from "../models/unsubscribe.js";
import {
  addSubscriberToMailingList,
  getMailingListSubscribers,
} from "../services/mailingListService.js";

/**
 * Get all contacts with pagination
 */
export const getContacts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Contact.countDocuments();

    return res.status(200).json({
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de la récupération des contacts");
  }
};

/**
 * Import contacts from CSV or Excel file
 */
export const importContacts = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("Aucun fichier n'a été téléchargé");
    }

    const filePath = req.file.path;
    let data: ContactImportData[] = [];

    if (req.file.originalname.endsWith(".csv")) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const result = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        delimiter: ";",
      });
      data = result.data as ContactImportData[];
    } else {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      if (sheetName) {
        const worksheet = workbook.Sheets[sheetName];
        if (worksheet) {
          data = XLSX.utils.sheet_to_json(worksheet) as ContactImportData[];
        }
      }
    }

    // Process and upsert contacts
    const summary = { imported: 0, updated: 0, errors: 0 };

    for (const row of data) {
      if (!row.email) {
        summary.errors++;
        continue;
      }

      const contactData = {
        lastName: row.nom || "",
        firstName: row.prenom || "",
        phone: row.telephone || "",
        email: row.email.toLowerCase().trim(),
        zipCode: row.code_postal || "",
        city: row.ville || "",
        address: row.adresse || "",
      };

      const result = await Contact.findOneAndUpdate(
        { email: contactData.email },
        { $set: contactData },
        { upsert: true, new: true, includeResultMetadata: true }
      );

      if (result.lastErrorObject?.updatedExisting) {
        summary.updated++;
      } else {
        summary.imported++;
      }
    }

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      message: "Importation terminée",
      summary,
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de l'importation des contacts");
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

    // 1. Get all local contacts
    const contacts = await Contact.find();
    
    // 2. Get all unsubscribed emails
    const unsubscribes = await Unsubscribe.find().select("email");
    const unsubscribedEmails = new Set(unsubscribes.map(u => u.email.toLowerCase()));

    // 3. Get current OVH subscribers
    const currentOVHSubscribers = await getMailingListSubscribers(domain, mailingList);
    const ovhEmails = new Set(currentOVHSubscribers.map(e => e.toLowerCase()));

    // 4. Filter contacts to add
    const toAdd = contacts.filter(c => {
      const email = c.email.toLowerCase();
      return !unsubscribedEmails.has(email) && !ovhEmails.has(email);
    });

    // 5. Add to OVH
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
