import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCurrentUser } from "../api/users";
import router from "../../routes";
import { checkUserPermissions } from "../utils/user";
import { UserContext } from "../contexts/user";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: 0,
    onError: () => {
      router.navigate("/login", { replace: true });
    },
    onSuccess: (data) => {
      if (checkUserPermissions(data.data, ["inactive"]))
        router.navigate("/inactive", { replace: true });
    },
  });
  return { currentUser: query.data?.data, ...query };
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
