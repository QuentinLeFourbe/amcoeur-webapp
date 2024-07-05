import { UserClientData } from "@amcoeur/types";
import axios from "axios";

export const logout = async () => await axios.post("/api/users/logout");

export const getCurrentUser = async () =>
  await axios.get<UserClientData>("/api/users/current");
