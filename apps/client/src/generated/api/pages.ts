import axios, { AxiosRequestConfig } from "axios";
import { PaginatedResult, type PageDataClient } from "@amcoeur/types";

export const getPage = (id: string | number) => {
  return axios.get<PageDataClient>(`/api/pages/${id}`);
};

export const getPages = (config: AxiosRequestConfig) => {
  return axios.get<PaginatedResult<PageDataClient>>("/api/pages", config);
};

export const getHomePage = () => {
  return axios.get<PageDataClient>("/api/pages/homepage");
};
