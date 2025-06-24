import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/users";
import router from "../../routes";
import { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../api/users";
import { UserContext } from "../contexts/user";
import { microsoftLogin } from "../utils/auth";
import { checkUserPermissions } from "../utils/user";

export const useCurrentUser = () => {
  const { accessToken, setAccessToken } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: 0,
    onSuccess: (data) => {
      if (checkUserPermissions(data.data, ["inactive"]))
        navigate("/inactive", { replace: true });
    },
    onError: (error: AxiosError) => {
      if (error.status === 401 && accessToken) {
        setAccessToken?.("");
      }
    },
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!accessToken) {
      if (isLoggedIn) {
        microsoftLogin();
      } else if (window.location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    }
  }, [accessToken]);

  return { currentUser: query.data?.data, ...query };
};
