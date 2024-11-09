import axios from "axios";
import {
  AdoptionClientPublicData,
  AdoptionsListClientPublicData,
} from "@amcoeur/types";
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

  return axios.get<AdoptionsListClientPublicData>(
    `/api/adoptions/public${filterQuery}`,
  );
};

export const getAdoption = (id: string) =>
  axios.get<AdoptionClientPublicData>(`/api/adoptions/${id}/public`);
