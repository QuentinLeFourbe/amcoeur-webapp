import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/users";
import router from "../../routes";
import { checkUserPermissions } from "../utils/user";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: 0,
    onSuccess: (data) => {
      if (checkUserPermissions(data.data, ["inactive"]))
        router.navigate("/inactive", { replace: true });
    },
  });
  return { currentUser: query.data?.data, ...query };
};
