import { FormAnswersClient, FormClientData } from "@amcoeur/types";
import axios from "axios";

export const getForm = (id: string) =>
  axios.get<FormClientData>(`/api/forms/${id}`);

export const postAnswers = (data: FormAnswersClient) =>  
axios.post<FormAnswersClient>(`/api/answers`, data)
