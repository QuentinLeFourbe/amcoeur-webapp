import type { NextFunction, Request, Response } from "express";
import type {
  AdoptionContact,
  AdoptionGender,
  AdoptionSpecies,
} from "@amcoeur/types";
import { sendEmail } from "../services/mailService.js";
import Adoption from "../models/adoption.js";
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
    const adoptionText = `Animal concerné: ${adoption?.name}\nEspèce: ${adoption ? getSpeciesLabel(adoption.species as AdoptionSpecies) : ""} \nSexe: ${
      adoption ? getGenderLabel(adoption.gender as AdoptionGender) : ""
    }\n`;
    const mailOptions = {
      to: process.env.CONTACT_EMAIL,
      subject: `Demande d'adoption pour ${adoption?.name}: ${name} ${firstname}`,
      text:
        adoptionText +
        "\n" +
        `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${email}\nTéléphone: ${phone}\nMotivations: ${motivation}`,
    };
    const mailOptionsToSender = {
      to: email,
      subject: `Votre demande d'adoption a bien été prise en compte`,
      text: `Bonjour,\nVotre demande d'adoption a bien été prise en compte. Nous vous contacterons dans les plus bref délais.\n`,
    };
    await sendEmail(mailOptions);
    await sendEmail(mailOptionsToSender);
    next();
  } catch (err) {
    res.locals.logger.error(err);
    next();
  }
};
