import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import router from "../../routes";
import { getCurrentUser } from "../api/users";
import { checkUserPermissions } from "../utils/user";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: 0,
  });

  useEffect(() => {
    if (query.data) {
      if (checkUserPermissions(query.data.data, ["inactive"]))
        router.navigate("/inactive", { replace: true });
    }
  }, [query.data]);

  return { currentUser: query.data?.data, ...query };
};
