import { AdoptionSpecies } from "@amcoeur/types";

export const speciesToString = (species: AdoptionSpecies) => {
  switch (species) {
    case "CAT":
      return "Chat";
    case "DOG":
      return "Chien";
    case "HORSE":
      return "Cheval";
  }
};
