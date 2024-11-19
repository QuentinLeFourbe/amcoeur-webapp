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
  const params: { [key: string]: string } = {};

  if (filter.gender) {
    params.gender = filter.gender;
  }
  if (filter.name) {
    params.name = filter.name;
  }

  if (filter.species) {
    const speciesToQueryArray = filter.species.reduce((queryAcc, species) => {
      if (!queryAcc) {
        return species;
      }
      return `${queryAcc},${species}`;
    }, "");
    params.species = speciesToQueryArray;
  }

  if (count) {
    params.count = "true";
  }

  if (page > 0) {
    params.page = page.toString();
  }

  return axios.get<PaginatedResult<AdoptionClientPublicData>>(
    `/api/adoptions/public`,
    { params },
  );
};

export const getAdoption = (id: string) =>
  axios.get<AdoptionClientPublicData>(`/api/adoptions/${id}/public`);
