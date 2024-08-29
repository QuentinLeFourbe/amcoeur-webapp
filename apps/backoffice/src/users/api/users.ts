import { UserClientData } from "@amcoeur/types";
import axios from "axios";

export const getUsers = () => {
  return axios.get<UserClientData[]>("/api/users");
};

export const deleteUser = (id: string) => axios.delete(`/api/users/${id}`);

export const activateUser = (user: UserClientData, active: boolean = true) => {
  const permissions = user.permissions;
  const inactiveIndex = permissions.indexOf("inactive");
  if (active && inactiveIndex > -1) {
    permissions.splice(inactiveIndex, 1);
  } else if (!active && inactiveIndex === -1) {
    permissions.push("inactive");
  }
  return axios.put(`/api/users/${user._id}`, { permissions });
};

export const getCodeChallenge = (codeVerifier: string) =>
  axios.post(`/api/users/code_challenge`, { codeVerifier });
