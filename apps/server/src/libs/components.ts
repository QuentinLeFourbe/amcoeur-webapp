import { PageComponent, PageComponentWithImage } from "@amcoeur/types";

export const matchComponentsWithImageUrl = (
  components: PageComponent[],
  images: Express.Multer.File[],
) => {
  if (!components || components.length === 0) {
    return [];
  }

  if (!images || images.length === 0) {
    return components;
  }

  const indexesOfComponentsWithImage = images.map((file) => {
    const fieldname = file.fieldname;
    const regex = /\[(\d+)\]/; // Expression régulière pour capturer les chiffres entre crochets
    const match = fieldname.match(regex);
    if (match) {
      return {
        index: parseInt(match[1]),
        imageUrl: `/api/images/${file.filename}`,
      };
    } else {
      throw new Error(
        "Impossible de trouver l'index du composant avec l'image.",
      );
    }
  });
  const componentsWithImages = components;
  indexesOfComponentsWithImage.forEach((indexWithImage) => {
    (
      componentsWithImages[indexWithImage.index] as PageComponentWithImage
    ).imageUrl = indexWithImage.imageUrl;
  });
  return componentsWithImages;
};
