import fs from "fs";
import path from "path";
import { dirname } from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");

export type ProcessedImage = {
  url: string;
  path: string;
};

/**
 * Redimensionne et compresse une image pour l'emailing.
 * On utilise le format JPEG pour une compatibilité maximale (Outlook ne supporte pas le WebP).
 */
export const processEmailImage = async (file: Express.Multer.File, targetWidth: number = 600): Promise<ProcessedImage> => {
  // On génère un nom de fichier unique pour la sortie
  const fileName = `processed_email_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  try {
    // Sharp lit le fichier source (multer) et écrit le fichier de destination (processed)
    await sharp(file.path)
      .resize(targetWidth, null, { withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(filePath);

    // On ne supprime le fichier original de multer QUE si sharp a réussi à écrire la destination
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  } catch (error) {
    // Si Sharp échoue, on logge et on essaie quand même de nettoyer le fichier temporaire
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw error;
  }

  const baseUrl = process.env.API_URL || "https://api.amcoeur.org";
  return {
    url: `${baseUrl}/images/${fileName}`,
    path: filePath
  };
};
