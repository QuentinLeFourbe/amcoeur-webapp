import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAdoption,
  deleteAdoption,
  getAdoption,
  getAdoptions,
  updateAdoption,
} from "../api/adoptions";
import { AxiosResponse } from "axios";
import { AdoptionClientData } from "@amcoeur/types";

export const useGetAdoptions = (
  params: { page?: number; limit?: number } = {},
) => {
  const query = useQuery({
    queryKey: ["adoptions", params],
    queryFn: () => getAdoptions(params),
  });
  return query;
};

export const useGetAdoption = (id: string) => {
  const query = useQuery({
    queryKey: ["adoptions", id],
    queryFn: () => getAdoption(id),
  });
  return query;
};

type UseQueryParams = {
  onSuccess?: (data: AxiosResponse<AdoptionClientData, unknown>) => void;
};

export const useCreateAdoption = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAdoption,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["adoptions"]);
      onSuccess?.(data);
    },
  });
  return mutation;
};

export const useUpdateAdoption = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateAdoption,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["adoptions", data.data._id]);
      queryClient.invalidateQueries(["adoptions"]);
      onSuccess?.(data);
    },
  });
  return mutation;
};

export const useDeleteAdoption = ({ onSuccess }: UseQueryParams = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAdoption,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["adoptions", data.data._id]);
      queryClient.invalidateQueries(["adoptions"]);
      onSuccess?.(data);
    },
  });
  return mutation;
};
