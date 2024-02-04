import fs from "fs";
import path from "path";

export const deleteUploadedImage = async (imageUrl: string) => {
  const image = imageUrl.split("/").pop();
  if (!image) {
    throw new Error("Impossible de trouver l'image à supprimer.");
  }
  const uploadFolder = path.join(__dirname, "..", "..", "uploads");
  if (fs.existsSync(path.join(uploadFolder, image))) {
    fs.unlinkSync(path.join(uploadFolder, image));
    console.log("Image supprimée avec succès.");
  } else {
    console.log("L'image n'existe pas.");
  }
};
