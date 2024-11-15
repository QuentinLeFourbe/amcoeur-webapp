import axios from "axios";
import { AdoptionClientPublicData, PaginatedResult } from "@amcoeur/types";
import { AdoptionFilter } from "../types/filter";

export const getAdoptions = ({
  filter = {},
  count = false,
  page = 1,
}: {
  filter?: AdoptionFilter;
  count?: boolean;
  page?: number;
}) => {
  let queryParams = "";
  if (filter.gender) {
    queryParams = `${queryParams}&gender=${filter.gender}`;
  }
  if (filter.name) {
    queryParams = `${queryParams}&name=${filter.name}`;
  }

  if (filter.species) {
    const speciesToQueryArray = filter.species.reduce((queryAcc, species) => {
      if (!queryAcc) {
        return species;
      }
      return `${queryAcc},${species}`;
    }, "");
    queryParams = `${queryParams}&species=${speciesToQueryArray}`;
  }

  if (count) {
    queryParams = `${queryParams}&count=true`;
  }

  if (page > 0) {
    queryParams = `${queryParams}&page=${page}`;
  }

  if (queryParams.startsWith("&")) {
    queryParams = queryParams.slice(1);
  }
  if (queryParams) {
    queryParams = `?${queryParams}`;
  }

  return axios.get<PaginatedResult<AdoptionClientPublicData>>(
    `/api/adoptions/public${queryParams}`,
  );
};

export const getAdoption = (id: string) =>
  axios.get<AdoptionClientPublicData>(`/api/adoptions/${id}/public`);
