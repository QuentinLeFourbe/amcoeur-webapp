import type {
  PageComponent,
  PageComponentWithImage,
  PageDataServer,
} from "@amcoeur/types";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * Deletes the uploaded image from the server.
 * @param imageUrl - The URL of the image to be deleted.
 * @throws Error if the image cannot be found.
 */
export const deleteUploadedImage = async (imageUrl: string) => {
  const image = imageUrl.split("/").pop();
  if (!image) {
    throw new Error("Can't find any image name in the url: " + imageUrl);
  }
  const uploadFolder = path.join(__dirname, "..", "..", "uploads");
  if (fs.existsSync(path.join(uploadFolder, image))) {
    fs.unlinkSync(path.join(uploadFolder, image));
  } else {
    throw new Error("Image to delete does not exist");
  }
};

/**
 * Deletes old images that are no longer used in the new page.
 * @param oldPage - The old page data.
 * @param newPage - The new page data.
 */
export const deleteOldImages = (
  oldPage: PageDataServer | null | undefined,
  newPage: PageDataServer | null | undefined,
) => {
  if (!oldPage || !newPage) {
    return;
  }
  oldPage.components.forEach((component: PageComponent) => {
    if ("imageUrl" in component) {
      if (
        !newPage.components.some(
          (c: PageComponent) =>
            (c as PageComponentWithImage).imageUrl === component.imageUrl,
        )
      ) {
        component.imageUrl && deleteUploadedImage(component.imageUrl);
      }
    }
  });
};
