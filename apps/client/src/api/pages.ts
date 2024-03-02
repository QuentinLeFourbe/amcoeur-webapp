import axios from "axios";
import type { PageDataClient } from "@amcoeur/types";

export const getPage = async (id: string | number) => {
  return axios.get<PageDataClient>(`/api/pages/${id}`);
};

export const getPageByRoute = async (route: string) => {
  return axios.get<PageDataClient[]>(
    `/api/pages?route=${route}`,
  );
};

export const getHomePage = async () => {
  return axios.get<PageDataClient>("/api/pages/homepage");
};
