import axios from "axios";
import type { PageDataClient } from "@amcoeur/types";

export const getPages = async () => {
  return axios.get<PageDataClient[]>("/api/pages");
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
  return axios.put<PageDataClient>(
    `/api/pages/${page._id}`,
    page,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
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
