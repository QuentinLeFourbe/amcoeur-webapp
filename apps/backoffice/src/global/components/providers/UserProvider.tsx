import { useState, type ReactNode } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../contexts/user";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loginState, setLoginState] = useState<string>();
  const [accessTokenInterceptor, setAccessTokenInterceptor] = useState<
    number | undefined
  >();
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
    queryClient.invalidateQueries(["currentUser"]);
  };

  const logout = () => {
    if (accessTokenInterceptor !== undefined) {
      axios.interceptors.request.eject(accessTokenInterceptor);
    }
    queryClient.invalidateQueries(["currentUser"]);
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
  };

  return (
    <UserContext.Provider
      value={{
        loginState,
        setLoginState,
        logout,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
