import nodemailer from "nodemailer";
import { Request, Response } from "express";

//Actually configured to use gmail, but should be change once it's connected to the amcoeur domain
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL || "",
    pass: process.env.CONTACT_PASSWORD || "",
  },
});

/**
 * Send an email to the contact email address
 * @param req
 * @param res
 */
export const sendEmailHandler = (req: Request, res: Response) => {
  //   const { to, subject, text } = req.body;
  console.log("On va envoyer un email");
  const mailOptions = {
    from: process.env.CONTACT_EMAIL,
    to: process.env.CONTACT_EMAIL,
    subject: "Hey test",
    text: "Hey, this is a text or a test ?",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .send(`Erreur lors de l'envoi de l'e-mail : ${error}`);
    }
    console.log("email envoyé");
    res.status(200).send(`E-mail envoyé : ${info.response}`);
  });
};
