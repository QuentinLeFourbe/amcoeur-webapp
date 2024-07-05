import { UserClientData } from "@amcoeur/types";
import { createContext } from "react";

export type UserContextType = {
  user: UserClientData | null;
  logoutUser: () => void;
  loginUser: (user: UserClientData) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
