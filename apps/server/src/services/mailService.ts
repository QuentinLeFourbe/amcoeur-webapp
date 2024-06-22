import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";
import type { MailOptions } from "nodemailer/lib/smtp-transport/index.js";

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_EMAIL_PASSWORD,
  },
});

transporter.verify(function (error) {
  if (error) {
    logger.error("Erreur lors de la connexion : ", error);
  } else {
    logger.info("Email server is ready to take our messages");
  }
});

/**
 * Send an email with the provided mail options
 * @param mailOptions
 */
export const sendEmail = async (mailOptions: MailOptions) => {
  try {
    await transporter?.sendMail(mailOptions);
  } catch (err) {
    throw new Error("Erreur lors de l'envoie du mail: " + err);
  }
};
