import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageDataClient } from "@amcoeur/types";
import { AxiosError, AxiosResponse } from "axios";
import {
  createHomePage,
  createPage,
  deletePage,
  getHomePage,
  getPage,
  getPages,
  updatePage,
} from "../api/pages";
import { addIdToComponents } from "../utils/page";

export const useGetPages = (params: { page?: number; limit?: number } = {}) => {
  const query = useQuery({
    queryKey: ["pages", params],
    queryFn: () => getPages(params),
  });
  return query;
};

export const useGetPage = (id: number | string) => {
  const query = useQuery({
    queryKey: ["page", id],
    queryFn: () => getPage(id),
    select: (data) => ({ ...data, data: addIdToComponents(data.data) }),
  });
  return query;
};

export const useGetHomePage = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["homePage"],
    queryFn: () => getHomePage(),
  });

  const { mutate } = useMutation({
    mutationFn: () => createHomePage(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["homePage"],
      });
    },
  });

  if ((query.error as AxiosError)?.response?.status === 404) {
    mutate();
  }

  return query;
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PageDataClient) => updatePage(data),
    onSuccess: (data: AxiosResponse<PageDataClient, unknown>) => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["page", data.data._id],
      });
      if (data.data.route === "accueil") {
        queryClient.invalidateQueries({
          queryKey: ["homePage"],
        });
      }
    },
  });
  return mutation;
};

type CreatePageProps = {
  onSuccess?: (data: AxiosResponse<PageDataClient, unknown>) => void;
};

export const useCreatePage = ({ onSuccess }: CreatePageProps = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PageDataClient) => createPage(data as PageDataClient),
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
    mutationFn: (id: string) => deletePage(id),
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
