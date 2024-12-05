import { AdoptionSpecies, AdoptionsListCount } from "@amcoeur/types";

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

export const getAttributeCount = (
  attribute: string,
  countList: AdoptionsListCount,
) => {
  const genderFound = countList?.gender?.find(
    (gender) => gender._id === attribute,
  );
  if (genderFound) {
    return genderFound.count;
  }

  const speciesFound = countList?.species?.find(
    (spec) => spec._id === attribute,
  );
  if (speciesFound) return speciesFound.count;

  return 0;
};
