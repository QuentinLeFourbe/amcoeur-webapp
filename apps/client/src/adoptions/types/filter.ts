import { AdoptionGender, AdoptionSpecies } from "@amcoeur/types";

export type AdoptionFilter = {
  gender?: AdoptionGender;
  species?: AdoptionSpecies[];
  name?: string;
};
