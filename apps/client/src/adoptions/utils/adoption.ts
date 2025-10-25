import { AdoptionCount, AdoptionSpecies } from "@amcoeur/types";

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
  countList: AdoptionCount,
) => {
  const genderFound = countList?.gender?.find(
    (gender) => gender.key === attribute,
  );
  if (genderFound) {
    return genderFound.value;
  }

  const speciesFound = countList?.species?.find(
    (spec) => spec.key === attribute,
  );
  if (speciesFound) return speciesFound.value;

  return 0;
};
