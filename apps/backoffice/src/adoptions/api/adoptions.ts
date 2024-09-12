import { AdoptionClient } from "@amcoeur/types";
import axios from "axios";

export const getAdoptions = () => axios.get<AdoptionClient[]>("/api/adoptions");

export const getAdoption = (id: string) =>
  axios.get<AdoptionClient>(`/api/adoptions/${id}`);

export const updateAdoption = (adoption: AdoptionClient) =>
  axios.put<AdoptionClient>(`/api/adoptions/${adoption._id}`, adoption);

export const deleteAdoption = (id: string) =>
  axios.delete<AdoptionClient>(`/api/adoptions/${id}`);

export const createAdoption = (adoption: AdoptionClient) =>
  axios.post<AdoptionClient>("/api/adoptions", adoption);
