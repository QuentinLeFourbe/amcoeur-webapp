import type { ContactImportData } from "@amcoeur/types";
import type { Request, Response } from "express";
import fs from "fs";
import Papa from "papaparse";
import * as XLSX from "xlsx";

import Contact from "../models/contact.js";

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
