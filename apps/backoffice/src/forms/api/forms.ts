import { FormClientData, FormSummary } from "@amcoeur/types";
import axios from "axios";

export const getForms = () => axios.get<FormSummary[]>("/api/forms");

export const getForm = (id: string) =>
  axios.get<FormClientData>(`/api/forms/${id}`);

export const updateForm = (form: FormClientData) =>
  axios.put<FormClientData>(`/api/forms/${form._id}`, form);

export const deleteForm = (id: string) =>
  axios.delete<FormClientData>(`/api/forms/${id}`);

export const createForm = (formData: FormClientData) =>
  axios.post<FormClientData>("/api/forms", formData);
