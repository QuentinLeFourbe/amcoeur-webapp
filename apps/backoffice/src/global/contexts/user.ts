import { createContext } from "react";
import { UserData } from "../types/user";

export type UserContextType = {
  user: UserData | null;
  logoutUser: () => void;
  loginUser: (user: UserData) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
