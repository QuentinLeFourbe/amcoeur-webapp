import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../api/users";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  return { currentUser: query.data?.data, ...query };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("invalidating queries");
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
  return mutation;
};
