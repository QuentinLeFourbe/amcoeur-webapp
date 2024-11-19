import type { ContactFormData } from "@amcoeur/types";
import type { Request, Response } from "express";

import { sendEmail } from "../services/mailService.js";

/**
 * Send an email to the contact email address
 * @param req
 * @param res
 */
export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, firstname, email, phone, message } =
      req.body as ContactFormData;
    const mailOptions = {
      to: process.env.CONTACT_EMAIL,
      subject: `Demande de contact: ${name} ${firstname}`,
      text: `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
    };
    const mailOptionsToSender = {
      to: email,
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
