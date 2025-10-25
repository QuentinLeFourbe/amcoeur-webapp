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
 * @param imageUrl - The URL of the image to be deleted. It should be of the form XXX/filename
 * @throws Error if the image cannot be found.
 */
export const deleteUploadedImage = async (imageUrl: string) => {
  if (!imageUrl) {
    throw new Error("Missing param imageUrl");
  }
  const image = imageUrl.split("/").pop() || "";
  const uploadFolder = path.join(__dirname, "..", "..", "uploads");
  if (fs.existsSync(path.join(uploadFolder, image))) {
    fs.unlinkSync(path.join(uploadFolder, image));
  }
};

export const deletePageImages = async (page: PageDataServer) => {
  page?.components.forEach((component: PageComponent) => {
    if ("imageUrl" in component && component.imageUrl) {
      deleteUploadedImage(component.imageUrl);
    }
  });
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
        if (component.imageUrl) deleteUploadedImage(component.imageUrl);
      }
    }
  });
};
