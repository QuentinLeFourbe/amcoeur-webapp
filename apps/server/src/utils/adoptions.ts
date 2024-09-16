import type {
  AdoptionServerPublicData,
  AdoptionServerData,
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
