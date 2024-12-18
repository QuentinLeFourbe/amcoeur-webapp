import { AdoptionClientData, PaginatedResult } from "@amcoeur/types";
import axios from "axios";

export const getAdoptions = (params: { page?: number; limit?: number } = {}) =>
  axios.get<PaginatedResult<AdoptionClientData>>("/api/adoptions", { params });

export const getAdoption = (id: string) =>
  axios.get<AdoptionClientData>(`/api/adoptions/${id}`);

export const updateAdoption = (adoption: AdoptionClientData) =>
  axios.put<AdoptionClientData>(`/api/adoptions/${adoption._id}`, adoption);

export const deleteAdoption = (id: string) =>
  axios.delete<AdoptionClientData>(`/api/adoptions/${id}`);

export const createAdoption = (adoption: AdoptionClientData) =>
  axios.post<AdoptionClientData>("/api/adoptions", adoption);
