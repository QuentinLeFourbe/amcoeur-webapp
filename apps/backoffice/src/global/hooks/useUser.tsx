import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { getCurrentUser } from "../api/users";
import { checkUserPermissions } from "../utils/user";
import { UserContext } from "../contexts/user";
import { microsoftLogin } from "../utils/auth";

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

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
