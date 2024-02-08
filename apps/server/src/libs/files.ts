import {
  PageComponent,
  PageComponentWithImage,
  PageData,
} from "@amcoeur/types";
import fs from "fs";
import path from "path";

/**
 * Deletes the uploaded image from the server.
 * @param imageUrl - The URL of the image to be deleted.
 * @throws Error if the image cannot be found.
 */
export const deleteUploadedImage = async (imageUrl: string) => {
  const image = imageUrl.split("/").pop();
  if (!image) {
    console.error(
      "Impossible de trouver l'image à supprimer pour: " + imageUrl,
    );
    return;
  }
  const uploadFolder = path.join(__dirname, "..", "..", "uploads");
  if (fs.existsSync(path.join(uploadFolder, image))) {
    fs.unlinkSync(path.join(uploadFolder, image));
    console.error("Image supprimée avec succès.");
  } else {
    console.error("L'image n'existe pas.");
  }
};

/**
 * Deletes old images that are no longer used in the new page.
 * @param oldPage - The old page data.
 * @param newPage - The new page data.
 */
export const deleteOldImages = (
  oldPage: PageData | null | undefined,
  newPage: PageData | null | undefined,
) => {
  if (!oldPage || !newPage) {
    return;
  }
  oldPage.components.forEach((component: PageComponent) => {
    if ("imageUrl" in component) {
      if (
        !newPage.components.some(
          (c) => (c as PageComponentWithImage).imageUrl === component.imageUrl,
        )
      ) {
        deleteUploadedImage(component.imageUrl);
      }
    }
  });
};
