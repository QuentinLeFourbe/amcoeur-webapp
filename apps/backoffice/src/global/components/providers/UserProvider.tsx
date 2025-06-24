import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type ReactNode, useState } from "react";

import { UserContext } from "../../contexts/user";
import router from "../../../routes";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loginState, setLoginState] = useState<string>();
  const [accessTokenInterceptor, setAccessTokenInterceptor] = useState<
    number | undefined
  >();
  const [accessToken, setRawAccessToken] = useState("");
  const queryClient = useQueryClient();

  const setAccessToken = (token: string) => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    setAccessTokenInterceptor(interceptor);
    setRawAccessToken(token);
    queryClient.invalidateQueries(["currentUser"]);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    if (accessTokenInterceptor !== undefined) {
      axios.interceptors.request.eject(accessTokenInterceptor);
    }
    queryClient.invalidateQueries(["currentUser"]);
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    setRawAccessToken("");
    localStorage.removeItem("isLoggedIn");
    router.navigate("/login", { replace: true });
  };

  return (
    <UserContext.Provider
      value={{
        loginState,
        setLoginState,
        logout,
        setAccessToken,
        accessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
