import { ContactFormData } from "@amcoeur/types";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_EMAIL_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Erreur lors de la connexion : ", error);
  } else {
    console.log("Email server is ready to take our messages");
  }
});

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
    await transporter?.sendMail(mailOptions);
    res.status(200).send("Email envoyé !");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Erreur lors de l'envoi de l'e-mail : ${err}`);
  }
};
