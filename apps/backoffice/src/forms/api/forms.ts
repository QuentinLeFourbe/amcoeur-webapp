import { FormClientData, FormSummary, PaginatedResult } from "@amcoeur/types";
import axios from "axios";

export const getForms = (params: { page?: number; limit?: number } = {}) => {
  return axios.get<PaginatedResult<FormSummary>>(`/api/forms`, { params });
};

export const getForm = (id: string) =>
  axios.get<FormClientData>(`/api/forms/${id}`);

export const updateForm = (form: FormClientData) =>
  axios.put<FormClientData>(`/api/forms/${form._id}`, form);

export const deleteForm = (id: string) =>
  axios.delete<FormClientData>(`/api/forms/${id}`);

export const createForm = (formData: FormClientData) =>
  axios.post<FormClientData>("/api/forms", formData);

export const duplicateForm = (id: string) =>
  axios.post<FormClientData>(`/api/forms/duplicate/${id}`);
