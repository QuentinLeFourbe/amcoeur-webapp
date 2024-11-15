import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormClientData } from "@amcoeur/types";
import { AxiosResponse } from "axios";
import {
  createForm,
  deleteForm,
  duplicateForm,
  getForm,
  getForms,
  updateForm,
} from "../api/forms";

export const useGetForms = ({ limit }: { limit?: number } = {}) => {
  const query = useQuery({
    queryFn: () => getForms({ limit }),
    queryKey: ["forms", limit],
  });
  return query;
};

export const useGetForm = (id: string) => {
  const query = useQuery({
    queryFn: () => getForm(id),
    queryKey: ["form", id],
  });
  return query;
};

type UseQueryParams = {
  onSuccess?: (data: AxiosResponse<FormClientData, unknown>) => void;
};

export const useCreateForm = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: FormClientData) => createForm(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["forms"]);
      onSuccess?.(data);
    },
  });

  return mutation;
};

export const useUpdateForm = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: FormClientData) => updateForm(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["form", data.data._id]);
      queryClient.invalidateQueries(["forms"]);
      onSuccess?.(data);
    },
  });
  return mutation;
};

export const useDeleteForm = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteForm(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["form", data.data._id]);
      queryClient.invalidateQueries(["forms"]);
      onSuccess?.(data);
    },
  });
  return mutation;
};

export const useDuplicateForm = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => duplicateForm(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["forms"]);
      onSuccess?.(data);
    },
  });
  return mutation;
};
