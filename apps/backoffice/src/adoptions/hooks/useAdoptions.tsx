import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAdoption,
  deleteAdoption,
  getAdoption,
  getAdoptions,
  updateAdoption,
} from "../api/adoptions";

export const useGetAdoptions = () => {
  const query = useQuery({
    queryKey: ["adoptions"],
    queryFn: getAdoptions,
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

export const useCreateAdoption = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries(["adoptions"]);
    },
  });
  return mutation;
};

export const useUpdateAdoption = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateAdoption,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["adoptions", data.data._id]);
      queryClient.invalidateQueries(["adoptions"]);
    },
  });
  return mutation;
};

export const useDeleteAdoption = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAdoption,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["adoptions", data.data._id]);
      queryClient.invalidateQueries(["adoptions"]);
    },
  });
  return mutation;
};
