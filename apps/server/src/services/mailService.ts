import nodemailer from "nodemailer";
import type { MailOptions } from "nodemailer/lib/smtp-transport/index.js";

import { logger } from "../utils/logger.js";

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOREPLY_EMAIL,
    pass: process.env.NOREPLY_EMAIL_PASSWORD,
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
    const options = {...mailOptions, from: process.env.NOREPLY_EMAIL}
    await transporter?.sendMail(options);
  } catch (err) {
    throw new Error("Erreur lors de l'envoie du mail: " + err);
  }
};
