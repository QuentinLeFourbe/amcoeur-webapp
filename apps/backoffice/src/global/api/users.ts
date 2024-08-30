import { UserClientData } from "@amcoeur/types";
import axios from "axios";

export const logout = async () => await axios.post("/api/users/logout");

export const getCurrentUser = () =>
  axios.get<UserClientData>("/api/users/current");

export const getAccessToken = (code: string, codeVerifier: string) =>
  axios.post(
    "https://login.microsoftonline.com/consumers/oauth2/v2.0/token",
    {
      redirect_uri: "https://amcoeur.org/administration/login/redirect",
      grant_type: "authorization_code",
      scope: "openid",
      code,
      code_verifier: codeVerifier,
      client_id: import.meta.env.VITE_MS_CLIENT_ID,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
