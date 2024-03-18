import type { PageComponent, PageComponentWithImage } from "@amcoeur/types";

/**
 * Matches components with their corresponding image URLs.
 *
 * @param components - The array of page components.
 * @param images - The array of uploaded image files.
 * @returns An array of components with their image URLs.
 * @throws Error if unable to find the index of a component with an image.
 */
export const matchComponentsWithImageUrl = (
  components: PageComponent[],
  images: Pick<Express.Multer.File,"fieldname" | "filename">[]
) => {
  if (!components || components.length === 0) {
    return [];
  }

  if (!images || images.length === 0) {
    return components;
  }

  const componentsIndexWithImage = images.map((image) => {
    const fieldname = image.fieldname;
    const regex = /\[(\d+)\]/; // Expression régulière pour capturer les chiffres entre crochets
    const match = fieldname.match(regex);
    if (match && match[1]) {
      return {
        index: parseInt(match[1]),
        imageUrl: `/api/images/${image.filename}`,
      };
    } else {
      throw new Error("Cannot extract an index from image's fieldname");
    }
  });

  const componentsWithImages = [...components];
  componentsIndexWithImage.forEach((indexWithImage) => {
    (
      componentsWithImages[indexWithImage.index] as PageComponentWithImage
    ).imageUrl = indexWithImage.imageUrl;
  });

  return componentsWithImages;
};
