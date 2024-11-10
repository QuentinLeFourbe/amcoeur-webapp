import { AdoptionClientData, AdoptionsListClientData } from "@amcoeur/types";
import axios from "axios";

export const getAdoptions = () =>
  axios.get<AdoptionsListClientData>("/api/adoptions");

export const getAdoption = (id: string) =>
  axios.get<AdoptionClientData>(`/api/adoptions/${id}`);

export const updateAdoption = (adoption: AdoptionClientData) =>
  axios.put<AdoptionClientData>(`/api/adoptions/${adoption._id}`, adoption);

export const deleteAdoption = (id: string) =>
  axios.delete<AdoptionClientData>(`/api/adoptions/${id}`);

export const createAdoption = (adoption: AdoptionClientData) =>
  axios.post<AdoptionClientData>("/api/adoptions", adoption);
