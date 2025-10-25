import { FormAnswersClient, PaginatedResult } from "@amcoeur/types";
import axios from "axios";

export const getAnswers = (
  formId: string,
  params: { page?: number; limit?: number; archived?: boolean } = {},
) =>
  axios.get<PaginatedResult<FormAnswersClient>>("/api/answers", {
    params: { formId, ...params },
  });

export const getAnswer = (id: string) =>
  axios.get<FormAnswersClient>(`/api/answers/${id}`);

export const updateAnswer = (
  data: Pick<FormAnswersClient, "_id" | "note" | "archived">,
) => axios.put(`/api/answers/${data._id}`, data);
