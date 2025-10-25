import { FormAnswersClient } from "@amcoeur/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getAnswer, getAnswers, updateAnswer } from "../api/answers";

export const useGetAnswers = (
  formId: string,
  params: { page?: number; limit?: number; archived?: boolean } = {},
) => {
  const query = useQuery({
    queryFn: () => getAnswers(formId, params),
    queryKey: ["answers", formId, params],
  });
  return query;
};

export const useGetAnswer = (answerId: string) => {
  const query = useQuery({
    queryFn: () => getAnswer(answerId),
    queryKey: ["answer", answerId],
  });
  return query;
};

export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Pick<FormAnswersClient, "note" | "archived" | "_id">) =>
      updateAnswer(data),
    onSuccess: (data: AxiosResponse<FormAnswersClient, unknown>) => {
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      queryClient.invalidateQueries({ queryKey: ["answer", data.data._id] });
    },
  });
  return mutation;
};
