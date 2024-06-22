import type { ContactFormData } from "@amcoeur/types";
import type { Request, Response } from "express";
import { sendEmail } from "../services/mailService.js";

/**
 * Send an email to the contact email address
 * @param req
 * @param res
 */
export const sendEmailHandler = async (req: Request, res: Response) => {
  try {
    const { name, firstname, mail, phone, message } =
      req.body as ContactFormData;
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `Demande de contact: ${name} ${firstname}`,
      text: `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${mail}\nTéléphone: ${phone}\nMessage: ${message}`,
    };
    const mailOptionsToSender = {
      from: process.env.CONTACT_EMAIL,
      to: mail,
      subject: `Votre demande de contact a bien été prise en compte`,
      text: `Bonjour,\nVotre demande de contact a bien été prise en compte. Nous vous contacterons dans les plus bref délais.\nVotre message: ${message}`,
    };
    await sendEmail(mailOptions);
    await sendEmail(mailOptionsToSender);
    res.status(200).send("Email envoyé !");
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).send(`Erreur lors de l'envoi de l'e-mail : ${err}`);
  }
};
