import { type PageDataClient,PaginatedResult } from "@amcoeur/types";
import axios from "axios";

export const getPages = async (
  params: { page?: number; limit?: number } = {},
) => {
  return axios.get<PaginatedResult<PageDataClient>>("/api/pages", { params });
};

export const getPage = async (id: string | number) => {
  return axios.get<PageDataClient>(`/api/pages/${id}`);
};

export const createPage = async (page: PageDataClient) => {
  return axios.post<PageDataClient>("/api/pages", page, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePage = async (page: PageDataClient) => {
  return axios.put<PageDataClient>(`/api/pages/${page._id}`, page, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePage = async (id: string) => {
  return axios.delete<PageDataClient>(`/api/pages/${id}`);
};

export const getHomePage = async () => {
  return axios.get<PageDataClient>("/api/pages/homepage");
};

export const createHomePage = async () => {
  return axios.post<PageDataClient>("/api/pages/homepage");
};
