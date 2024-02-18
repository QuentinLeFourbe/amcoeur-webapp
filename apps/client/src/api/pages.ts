import axios from "axios";
import type { PageData } from "@amcoeur/types";

export const getPage = async (id: string | number) => {
  return axios.get<PageData>(`/api/pages/${id}`);
};

export const getPageByRoute = async (route: string) => {
  return axios.get<PageData[]>(
    `/api/pages?route=${route}`,
  );
};

export const getHomePage = async () => {
  return axios.get<PageData>("/api/pages/homepage");
};
