import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageData } from "@amcoeur/types";
import { AxiosResponse } from "axios";
import { getPage, getPages, updatePage } from "../api/pages";

export const useGetPages = () => {
  const query = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });
  return query;
};

export const useGetPage = (id: number | string) => {
  const query = useQuery({
    queryKey: ["page", id],
    queryFn: () => getPage(id),
  });
  return query;
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PageData) => updatePage(data as PageData),
    onSuccess: (data: AxiosResponse<PageData, unknown>) => {
      console.log("invalidate id:", data.data.id);
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["page"],
      });
      queryClient.invalidateQueries({
        queryKey: [data.data.id],
      });
    },
  });
  return mutation;
};
