import { AdoptionClientServerResponsePublicData } from "@amcoeur/types";
import axios from "axios";
import { AdoptionFilter } from "../types/filter";

export const getAdoptions = (filter: AdoptionFilter = {}) => {
  let filterQuery = "";
  if (filter.gender) {
    filterQuery = `${filterQuery}&gender=${filter.gender}`;
  }
  if (filter.name) {
    filterQuery = `${filterQuery}&name=${filter.name}`;
  }

  if (filter.species) {
    const speciesToQueryArray = filter.species.reduce((queryAcc, species) => {
      if (!queryAcc) {
        return species;
      }
      return `${queryAcc},${species}`;
    }, "");
    filterQuery = `${filterQuery}&species=${speciesToQueryArray}`;
  }

  if (filterQuery.startsWith("&")) {
    filterQuery = filterQuery.slice(1);
  }
  if (filterQuery) {
    filterQuery = `?${filterQuery}`;
  }

  return axios.get<AdoptionClientServerResponsePublicData>(
    `/api/adoptions/public${filterQuery}`,
  );
};
