import {
  PageComponent,
  PageComponentType,
  PageDataClient,
} from "@amcoeur/types";

const emptyComponentWithImage = {
  imageUrl: "",
  image: null,
};

export const getNewComponent = (type: PageComponentType): PageComponent => {
  const id = crypto.randomUUID();
  switch (type) {
    case "Image":
      return {
        type,
        id,
        ...emptyComponentWithImage,
      };
    case "TextArea":
      return {
        type,
        id,
        content: "",
      };
    case "TitleBanner":
      return {
        type,
        id,
        title: "",
        content: "",
        ...emptyComponentWithImage,
      };
    case "ContentPanel":
      return {
        type,
        id,
        ...emptyComponentWithImage,
      };
    case "Form":
      return {
        type,
        id,
      };
    default:
      return {
        type: "Empty",
        id,
      };
  }
};

export const addIdToComponents = (page: PageDataClient) => {
  const componentsWithId = page.components.map((component) => {
    if (component.id) {
      return component;
    }

    const randomId = crypto.randomUUID();
    return { ...component, id: randomId };
  });
  return { ...page, components: componentsWithId };
};

export const generateRouteFromName = (name: string) => {
  // Convertir en minuscules
  let formatted: string = name.toLowerCase();

  // Remplacer les espaces et les caractères spéciaux par des tirets
  formatted = formatted.replace(/[^a-z0-9]+/g, "-");

  // Supprimer les tirets en début et fin de chaîne
  formatted = formatted.replace(/^-+|-+$/g, "");

  return formatted;
};
