import axios from "axios";
import type { PageData } from "@amcoeur/types";

export const getPages = async () => {
  return axios.get<PageData[]>("http://localhost:3000/pages");
};

export const getPage = async (id: string | number) => {
  return axios.get<PageData>(`http://localhost:3000/pages/${id}`);
};

export const createPage = async (page: PageData) => {
  return axios.post<PageData>("http://localhost:3000/pages", page);
};

export const updatePage = async (page: PageData) => {
  return axios.put<PageData>(`http://localhost:3000/pages/${page.id}`, page);
};

export const deletePage = async (id: string | number) => {
  return axios.delete<PageData>(`http://localhost:3000/pages/${id}`);
};
