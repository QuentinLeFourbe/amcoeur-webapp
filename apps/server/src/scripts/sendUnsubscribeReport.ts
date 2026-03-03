import "dotenv/config";

import mongoose from "mongoose";

import Unsubscribe from "../models/unsubscribe.js";
import { sendEmail } from "../services/mailService.js";
import { logger } from "../utils/logger.js";

const databaseUri = process.env.DB_URI || "";
const adminEmail = process.env.CONTACT_EMAIL;

const sendReport = async () => {
  if (!adminEmail) {
    logger.error("La variable d'environnement CONTACT_EMAIL n'est pas définie.");
    process.exit(1);
  }
  try {
    await mongoose.connect(databaseUri);
    logger.info("Connexion à la base de données établie pour le rapport");

    const pendingUnsubscribes = await Unsubscribe.find({ sentToAdmin: false });

    if (pendingUnsubscribes.length === 0) {
      logger.info("Aucune nouvelle désinscription à signaler.");
      await mongoose.disconnect();
      process.exit(0);
    }

    const emailList = pendingUnsubscribes
      .map(
        (u) =>
          `- ${u.email} (le ${u.unsubscribedAt.toLocaleDateString("fr-FR")})`,
      )
      .join("
");

    const mailOptions = {
      to: adminEmail,
      subject: `[Amcoeur] Rapport hebdomadaire des désinscriptions`,
      text: `Bonjour,

Voici la liste des personnes qui se sont désinscrites de la newsletter cette semaine :

${emailList}

Merci de mettre à jour votre liste de diffusion OVH si nécessaire.

Cordialement,
Le système Amcoeur`,
    };

    await sendEmail(mailOptions);
    logger.info("Rapport de désinscription envoyé à l'administration.");

    // Mark as sent
    await Unsubscribe.updateMany(
      { _id: { $in: pendingUnsubscribes.map((u) => u._id) } },
      { $set: { sentToAdmin: true } },
    );

    await mongoose.disconnect();
    logger.info("Base de données déconnectée. Fin du script.");
    process.exit(0);
  } catch (error) {
    logger.error("Erreur lors de l'exécution du script de rapport :", error);
    process.exit(1);
  }
};

sendReport();
