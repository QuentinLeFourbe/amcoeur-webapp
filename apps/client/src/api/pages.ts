import axios from "axios";
import type { PageData } from "@amcoeur/types";

export const getPage = async (id: string | number) => {
  return axios.get<PageData>(`http://localhost:3000/api/pages/${id}`);
};

export const getPageByRoute = async (route: string) => {
  return axios.get<PageData[]>(
    `http://localhost:3000/api/pages?route=${route}`,
  );
};
