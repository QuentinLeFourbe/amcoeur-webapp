import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageData } from "@amcoeur/types";
import { AxiosResponse } from "axios";
import {
  createPage,
  deletePage,
  getHomePage,
  getPage,
  getPages,
  updatePage,
} from "../api/pages";

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

export const useGetHomePage = () => {
  const query = useQuery({
    queryKey: ["homePage"],
    queryFn: () => getHomePage(),
  });
  return query;
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PageData) => updatePage(data as PageData),
    onSuccess: (data: AxiosResponse<PageData, unknown>) => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["page"],
      });
      queryClient.invalidateQueries({
        queryKey: [data.data._id],
      });
    },
  });
  return mutation;
};

type CreatePageProps = {
  onSuccess?: (data: AxiosResponse<PageData, unknown>) => void;
};

export const useCreatePage = ({ onSuccess }: CreatePageProps = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PageData) => createPage(data as PageData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      onSuccess?.(data);
    },
  });
  return mutation;
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number | string) => deletePage(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["page"],
      });
      queryClient.invalidateQueries({
        queryKey: [data.data._id],
      });
    },
  });
  return mutation;
};
