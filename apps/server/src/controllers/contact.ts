import type { ContactImportData } from "@amcoeur/types";
import type { Request, Response } from "express";
import fs from "fs";
import Papa from "papaparse";
import XLSX from "xlsx";

import Contact from "../models/contact.js";

// Validation simple du format email (doit avoir un @ et un . avec extension)
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Get all contacts with pagination and search
 */
export const getContacts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Contact.countDocuments(query);

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
 * Create a new contact
 */
export const createContact = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, phone, zipCode, city, address } = req.body;

    if (!email) {
      return res.status(400).send("L'email est obligatoire");
    }

    if (!isValidEmail(email.toLowerCase().trim())) {
      return res.status(400).send("Le format de l'email est invalide (ex: exemple@domaine.com)");
    }

    const existing = await Contact.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).send("Un contact avec cet email existe déjà");
    }

    const contact = new Contact({
      email: email.toLowerCase().trim(),
      firstName,
      lastName,
      phone,
      zipCode,
      city,
      address,
    });

    await contact.save();
    return res.status(201).json(contact);
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de la création du contact");
  }
};

/**
 * Delete a contact
 */
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    return res.status(200).send("Contact supprimé");
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de la suppression du contact");
  }
};

/**
 * Export all contacts as CSV
 */
export const exportContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ lastName: 1, firstName: 1 });
    
    const csvData = contacts.map(c => ({
      nom: c.lastName || "",
      prenom: c.firstName || "",
      email: c.email,
      telephone: c.phone || "",
      code_postal: c.zipCode || "",
      ville: c.city || "",
      adresse: c.address || ""
    }));

    const csv = Papa.unparse(csvData, { delimiter: ";" });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=contacts_locaux.csv");
    return res.status(200).send(csv);
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send("Erreur lors de l'exportation des contacts");
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
      } catch (err: unknown) {
        const error = err as Error;
        res.locals.logger.error("Erreur lors de la lecture du fichier Excel:", error);
        return res.status(400).send(`Le fichier Excel est mal formé ou illisible: ${error.message || error}`);
      }
    }

    const summary = { imported: 0, updated: 0, errors: 0, details: [] as { row?: number; email?: string; error: string }[] };
    let rowNumber = 1; // On commence à 1 (en-tête souvent à 0 ou 1)

    for (const row of (data as unknown) as Record<string, unknown>[]) {
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
        
        if (!email || !isValidEmail(email)) {
          summary.errors++;
          summary.details.push({ row: rowNumber, email, error: "Format d'email invalide (ex: exemple@domaine.com)" });
          continue;
        }

        const safeString = (val: unknown) => (val !== undefined && val !== null) ? String(val).trim() : "";

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
      } catch (err: unknown) {
        const error = err as Error;
        res.locals.logger.error(`Erreur lors du traitement d'une ligne d'import:`, { row, error });
        summary.errors++;
        summary.details.push({ 
          row: rowNumber, 
          email: String(row.email || ""), 
          error: error.message || "Erreur inconnue lors de l'enregistrement" 
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
