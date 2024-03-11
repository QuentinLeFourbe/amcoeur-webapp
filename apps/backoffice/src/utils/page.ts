import { PageComponent, PageComponentType } from "@amcoeur/types";

const emptyComponentWithImage = {
  imageUrl: "",
  image: null,
};

export const getNewComponent = (
  type: PageComponentType,
): PageComponent => {
  switch (type) {
    case "Image":
      return {
        type,
        ...emptyComponentWithImage,
      };
    case "TextArea":
      return {
        type,
        content: "",
      };
    case "TitleBanner":
      return {
        type,
        title: "",
        content: "",
        ...emptyComponentWithImage,
      };
    case "ContentPanel":
      return {
        type,
        ...emptyComponentWithImage,
      };
    default:
      return { type: "Empty" };
  }
};
