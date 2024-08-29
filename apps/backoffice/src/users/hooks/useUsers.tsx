import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserClientData } from "@amcoeur/types";
import { activateUser, deleteUser, getUsers } from "../api/users";

export const useUsers = () => {
  const query = useQuery({ queryFn: getUsers, queryKey: ["users"] });
  return query;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
  return mutation;
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { user: UserClientData; active: boolean }) =>
      activateUser(data.user, data.active),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
  return mutation;
};
