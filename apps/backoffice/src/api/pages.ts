import axios from "axios";
import type { PageData } from "@amcoeur/types";

export const getPages = async () => {
  return axios.get<PageData[]>("http://localhost:3000/pages");
};

export const getPage = async (id: number) => {
  return axios.get<PageData[]>(`http://localhost:3000/pages/${id}`);
};
