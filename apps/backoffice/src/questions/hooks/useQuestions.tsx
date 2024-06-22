import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QuestionClientData } from "@amcoeur/types";
import { AxiosResponse } from "axios";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
} from "../api/questions";

export const useGetQuestions = () => {
  const query = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  return query;
};

export const useGetQuestion = (id: string) => {
  const query = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestion(id),
  });
  return query;
};

type useUpdateQuestionProps = {
  onSuccess?: (data: AxiosResponse<QuestionClientData, unknown>) => void;
};
export const useUpdateQuestion = ({ onSuccess }: useUpdateQuestionProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: QuestionClientData) => updateQuestion(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["question", data.data._id],
      });
      onSuccess?.(data);
    },
  });

  return mutation;
};

type useCreateQuestionProps = {
  onSuccess?: (data: AxiosResponse<QuestionClientData, unknown>) => void;
};
export const useCreateQuestion = ({ onSuccess }: useCreateQuestionProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: QuestionClientData) => createQuestion(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
      onSuccess?.(data);
    },
  });

  return mutation;
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteQuestion(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["question", data.data._id],
      });
    },
  });

  return mutation;
};
