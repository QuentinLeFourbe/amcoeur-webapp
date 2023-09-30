import { ContactData } from "./../../client/src/types/email";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { Request, Response } from "express";

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CONTACT_CLIENT_ID,
      process.env.CONTACT_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.CONTACT_REFRESH_TOKEN,
    });

    const accessToken: string | null | undefined = await new Promise(
      (resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log("*ERR: ", err);
            reject();
          }
          resolve(token);
        });
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.CONTACT_EMAIL,
        accessToken: accessToken as string,
        refreshToken: process.env.CONTACT_REFRESH_TOKEN,
        clientId: process.env.CONTACT_CLIENT_ID,
        clientSecret: process.env.CONTACTCLIENT_SECRET,
      },
    });
    return transporter;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

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

    const emailTransporter = await createTransporter();
    await emailTransporter?.sendMail(mailOptions);
    res.status(200).send("Email envoyé !");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Erreur lors de l'envoi de l'e-mail : ${err}`);
  }
};
