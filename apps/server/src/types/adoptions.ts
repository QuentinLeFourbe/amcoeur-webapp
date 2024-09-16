import type { AdoptionGender, AdoptionSpecies } from "@amcoeur/types";

export type AdoptionFilter = {
  species?: AdoptionSpecies[];
  gender?: AdoptionGender;
  name?: string;
};
