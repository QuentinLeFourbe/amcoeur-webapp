import type {
  AdoptionGender,
  AdoptionServerData,
  AdoptionServerPublicData,
  AdoptionSpecies,
} from "@amcoeur/types";

import type { AdoptionFilter } from "../types/adoptions.js";

export const convertAdoptionToPublicData = (adoption: AdoptionServerData) => {
  if (!adoption) return {};

  return {
    _id: adoption._id,
    name: adoption.name,
    gender: adoption.gender,
    description: adoption.description,
    species: adoption.species,
    race: adoption.race,
    imageUrl: adoption.imageUrl,
  } as AdoptionServerPublicData;
};

export const getAdoptionFilter = ({
  species,
  gender,
  name,
}: AdoptionFilter) => {
  const filter = {} as { species?: unknown; gender?: unknown; name?: unknown };
  if (species) {
    filter.species = { $in: species };
  }
  if (gender) {
    filter.gender = gender;
  }
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }
  return filter;
};

export const getSpeciesLabel = (species: AdoptionSpecies) => {
  switch (species) {
    case "CAT":
      return "chat";
    case "DOG":
      return "chien";
    case "HORSE":
      return "cheval";
    case "OTHER":
      return "autre";
  }
};

export const getGenderLabel = (gender: AdoptionGender) => {
  switch (gender) {
    case "MALE":
      return "mâle";
    case "FEMALE":
      return "femelle";
  }
};
