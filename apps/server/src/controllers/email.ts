import { ContactData } from "@amcoeur/types";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  // host: "smtp.amcoeur.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_EMAIL_PASSWORD,
  },
});

/**
 * Send an email to the contact email address
 * @param req
 * @param res
 */
export const sendEmailHandler = async (req: Request, res: Response) => {
  try {
    const { name, firstname, mail, phone, message } = req.body as ContactData;
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `Demande de contact: ${name} ${firstname}`,
      text: `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${mail}\nTéléphone: ${phone}\nMessage: ${message}`,
    };
    console.log("mail", process.env.CONTACT_EMAIL);
    console.log("password", process.env.CONTACT_EMAIL_PASSWORD);
    console.log("trying to send email");
    await transporter?.sendMail(mailOptions);
    res.status(200).send("Email envoyé !");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Erreur lors de l'envoi de l'e-mail : ${err}`);
  }
};
