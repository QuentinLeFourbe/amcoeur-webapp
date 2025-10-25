import type {
  AdoptionContact,
  AdoptionGender,
  AdoptionSpecies,
} from "@amcoeur/types";
import type { NextFunction, Request, Response } from "express";

import Adoption from "../models/adoption.js";
import { sendEmail } from "../services/mailService.js";
import { getGenderLabel, getSpeciesLabel } from "../utils/adoptions.js";

/**
 * Send an email to the contact email for an adoption
 * @param req
 * @param res
 * @param next
 */
export const sendAdoptionEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, firstname, email, phone, motivation, adoptionId } =
      req.body as AdoptionContact;

    const adoption = await Adoption.findById(adoptionId);

    // Vérification si l'adoption est urgente
    const isUrgent = adoption?.emergency ? "🚨 URGENT - " : "";

    // Formatage clair des informations
    const adoptionText = `
${isUrgent}🐾 INFORMATIONS SUR L'ANIMAL 🐾${isUrgent ? " 🚨" : ""}
${"=".repeat(35)}
Nom: ${adoption?.name || "Non spécifié"}
Espèce: ${adoption ? getSpeciesLabel(adoption.species as AdoptionSpecies) : "Non spécifié"}
Sexe: ${adoption ? getGenderLabel(adoption.gender as AdoptionGender) : "Non spécifié"}
Race: ${adoption?.race || "Non spécifiée"}
${adoption?.emergency ? "🚨 STATUT: URGENT - Adoption prioritaire 🚨" : ""}
${adoption?.description ? `Description: ${adoption.description}` : ""}

👤 INFORMATIONS DU CONTACT 👤
=============================
Nom: ${name}
Prénom: ${firstname}
Email: ${email}
Téléphone: ${phone}

💬 MOTIVATIONS
==============
${motivation}

📋 RÉSUMÉ DE LA DEMANDE
=======================
Demande d'adoption reçue le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}
pour l'animal: ${adoption?.name}
${adoption?.emergency ? "🚨⚠️  CETTE DEMANDE EST PRIORITAIRE - ANIMAL URGENT ⚠️🚨" : ""}
    `.trim();

    const mailOptions = {
      to: process.env.CONTACT_EMAIL,
      subject: `${isUrgent}🐾 Demande d'adoption pour ${adoption?.name}: ${name} ${firstname}`,
      text: adoptionText,
    };

    const mailOptionsToSender = {
      to: email,
      subject: `🐾 Votre demande d'adoption a bien été prise en compte`,
      text: `Bonjour ${firstname},\n\nVotre demande d'adoption pour ${adoption?.name} a bien été prise en compte. Nous vous contacterons dans les plus brefs délais.\n\nCordialement,\nL'équipe d'adoption`,
    };

    await sendEmail(mailOptions);
    await sendEmail(mailOptionsToSender);
    next();
  } catch (err) {
    res.locals.logger.error(err);
    next();
  }
};
