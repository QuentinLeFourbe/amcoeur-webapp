import type { ContactImportData } from "@amcoeur/types";
import type { Request, Response } from "express";
import fs from "fs";
import Papa from "papaparse";
import XLSX from "xlsx";

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
  if (!req.file) {
    return res.status(400).send("Aucun fichier n'a été téléchargé");
  }

  const filePath = req.file.path;

  try {
    let data: ContactImportData[] = [];

    if (req.file.originalname.toLowerCase().endsWith(".csv")) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const result = Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true,
          delimiter: ";",
        });
        data = result.data as ContactImportData[];
      } catch (err) {
        res.locals.logger.error("Erreur lors de la lecture du fichier CSV:", err);
        return res.status(400).send("Le fichier CSV est mal formé ou illisible");
      }
    } else {
      try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        if (sheetName) {
          const worksheet = workbook.Sheets[sheetName];
          if (worksheet) {
            data = XLSX.utils.sheet_to_json(worksheet) as ContactImportData[];
          }
        }
      } catch (err: any) {
        res.locals.logger.error("Erreur lors de la lecture du fichier Excel:", err);
        return res.status(400).send(`Le fichier Excel est mal formé ou illisible: ${err.message || err}`);
      }
    }

    const summary = { imported: 0, updated: 0, errors: 0, details: [] as any[] };
    let rowNumber = 1; // On commence à 1 (en-tête souvent à 0 ou 1)

    for (const row of data as any[]) {
      rowNumber++;
      try {
        // Recherche des clés de manière insensible à la casse
        const getVal = (variants: string[]) => {
          const key = Object.keys(row).find(k => 
            variants.includes(k.toLowerCase().trim())
          );
          return key ? row[key] : undefined;
        };

        const rawEmail = getVal(["email", "e-mail", "courriel"]);
        
        if (!rawEmail) {
          summary.errors++;
          summary.details.push({ row: rowNumber, error: "Email manquant ou colonne 'email' non trouvée" });
          continue;
        }

        // Conversion forcée en string pour éviter les erreurs .toLowerCase() sur des nombres
        const email = String(rawEmail).toLowerCase().trim();
        
        if (!email || !email.includes("@")) {
          summary.errors++;
          summary.details.push({ row: rowNumber, email, error: "Format d'email invalide" });
          continue;
        }

        const safeString = (val: any) => (val !== undefined && val !== null) ? String(val).trim() : "";

        const contactData = {
          lastName: safeString(getVal(["nom", "lastname", "last name", "nom de famille"])),
          firstName: safeString(getVal(["prenom", "prénom", "firstname", "first name"])),
          phone: safeString(getVal(["telephone", "téléphone", "phone", "tel"])),
          email,
          zipCode: safeString(getVal(["code_postal", "cp", "zipcode", "zip code", "zip"])),
          city: safeString(getVal(["ville", "city", "commune"])),
          address: safeString(getVal(["adresse", "address"])),
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
      } catch (err: any) {
        res.locals.logger.error(`Erreur lors du traitement d'une ligne d'import:`, { row, error: err });
        summary.errors++;
        summary.details.push({ 
          row: rowNumber, 
          email: row.email, 
          error: err.message || "Erreur inconnue lors de l'enregistrement" 
        });
      }
    }

    // On ne renvoie que les 50 premières erreurs pour ne pas saturer la réponse
    if (summary.details.length > 50) {
      summary.details = summary.details.slice(0, 50);
      summary.details.push({ error: "... et d'autres erreurs non affichées" });
    }

    return res.status(200).json({
      message: "Importation terminée",
      summary,
    });
  } catch (err) {
    res.locals.logger.error("Erreur générale lors de l'importation:", err);
    return res.status(500).send("Erreur lors de l'importation des contacts");
  } finally {
    // Toujours supprimer le fichier temporaire
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkErr) {
        res.locals.logger.error("Impossible de supprimer le fichier temporaire:", unlinkErr);
      }
    }
  }
};
