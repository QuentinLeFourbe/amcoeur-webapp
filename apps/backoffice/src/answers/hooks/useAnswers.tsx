import { useQuery } from "@tanstack/react-query";
import { getAnswer, getAnswers } from "../api/answers";

export const useGetAnswers = (formId: string) => {
  const query = useQuery({
    queryFn: () => getAnswers(formId),
    queryKey: ["answers", formId],
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
