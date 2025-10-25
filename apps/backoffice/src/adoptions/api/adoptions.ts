import {
  AdoptionClientData,
  AdoptionFilter,
  AdoptionSortBy,
  PaginatedResult,
} from "@amcoeur/types";
import axios from "axios";

export const getAdoptions = ({
  page,
  limit,
  filter,
  sortBy,
  sortOrder,
}: {
  page?: number;
  limit?: number;
  filter?: AdoptionFilter;
  sortBy?: AdoptionSortBy;
  sortOrder?: "desc";
} = {}) => {
  const params: { [key: string]: string } = {};

  if (page) params.page = page?.toString();
  if (limit) params.limit = limit?.toString();
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.order = sortOrder;

  if (filter?.visible !== undefined) params.visible = filter.visible.toString();
  if (filter?.emergency !== undefined)
    params.emergency = filter.emergency.toString();
  if (filter?.adopted !== undefined) params.adopted = filter.adopted.toString();
  if (filter?.gender) params.gender = filter.gender;
  if (filter?.name) params.name = filter.name;

  if (filter?.species) {
    const speciesToQueryArray = filter.species.reduce((queryAcc, species) => {
      if (!queryAcc) {
        return species;
      }
      return `${queryAcc},${species}`;
    }, "");
    params.species = speciesToQueryArray;
  }

  return axios.get<PaginatedResult<AdoptionClientData>>("/api/adoptions", {
    params,
  });
};

export const getAdoption = (id: string) =>
  axios.get<AdoptionClientData>(`/api/adoptions/${id}`);

export const updateAdoption = (adoption: AdoptionClientData) =>
  axios.put<AdoptionClientData>(`/api/adoptions/${adoption._id}`, adoption, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteAdoption = (id: string) =>
  axios.delete<AdoptionClientData>(`/api/adoptions/${id}`);

export const createAdoption = (adoption: AdoptionClientData) =>
  axios.post<AdoptionClientData>("/api/adoptions", adoption, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
