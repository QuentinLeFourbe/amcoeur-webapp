import { createContext } from "react";

export type UserContextType = {
  loginState?: string; //use to retrieve the user's flow in the app after the login
  setLoginState: (state: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  accessToken?: string;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
