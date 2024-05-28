import { FormAnswersClient } from "@amcoeur/types";
import axios from "axios";

export const getAnswers = (formId: string) =>
  axios.get<FormAnswersClient[]>("/api/answers", { params: { formId } });

export const getAnswer = (id: string) =>
  axios.get<FormAnswersClient>(`/api/answers/${id}`);
