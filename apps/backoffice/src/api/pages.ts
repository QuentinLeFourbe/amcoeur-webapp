import axios from "axios";
import type { PageData } from "@amcoeur/types";

export const getPages = async () => {
  return axios.get<PageData[]>("http://localhost:3000/api/pages");
};

export const getPage = async (id: string | number) => {
  return axios.get<PageData>(`http://localhost:3000/api/pages/${id}`);
};

export const createPage = async (page: PageData) => {
  return axios.post<PageData>("http://localhost:3000/api/pages", page, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePage = async (page: PageData) => {
  return axios.put<PageData>(
    `http://localhost:3000/api/pages/${page._id}`,
    page,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const deletePage = async (id: string) => {
  return axios.delete<PageData>(`http://localhost:3000/api/pages/${id}`);
};

export const getHomePage = async () => {
  return axios.get<PageData>("http://localhost:3000/api/pages/homepage");
};

export const createHomePage = async () => {
  return axios.post<PageData>("http://localhost:3000/api/pages/homepage");
};
