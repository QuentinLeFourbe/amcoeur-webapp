import { FormField, FormFieldType } from "@amcoeur/types";

export const getLabelFromValue = (value: FormFieldType) => {
  switch (value) {
    case "MULTIPLE_CHOICES":
      return "Choix multiples";
    case "UNIQUE_CHOICE":
      return "Choix unique";
    case "SHORT_TEXT":
      return "Texte court";
    case "TEXT_AREA":
      return "Bloc de texte";
    case "NUMERIC":
      return "Numérique";
    case "GENDER":
      return "Civilité";
    case "PHONE":
      return "Téléphone";
    case "EMAIL":
      return "Email";
    case "DISPLAY_TEXT":
      return "Texte à afficher";
  }
};

export const getNewField = () => {
  return {
    id: crypto.randomUUID(),
    content: "",
    type: "SHORT_TEXT",
    isRequired: false,
  } as FormField;
};
