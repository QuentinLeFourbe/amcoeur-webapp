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
  const fileName = `email_${Date.now()}_${file.originalname.split('.')[0]}.jpg`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  await sharp(file.path)
    .resize(targetWidth, null, { withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(filePath);

  // Supprimer le fichier temporaire original de multer
  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  const baseUrl = process.env.API_URL || "https://api.amcoeur.org";
  return {
    url: `${baseUrl}/images/${fileName}`,
    path: filePath
  };
};
