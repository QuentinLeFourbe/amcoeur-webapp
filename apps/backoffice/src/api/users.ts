import axios from "axios";
import { LoginInfo } from "../types/login";

export const logout = async () => await axios.post("/api/users/logout");

export const login = async (loginData: LoginInfo) =>
  await axios.post("/api/users/login", loginData);

export const getCurrentUser = async () =>
  await axios.get("/api/users/current");
