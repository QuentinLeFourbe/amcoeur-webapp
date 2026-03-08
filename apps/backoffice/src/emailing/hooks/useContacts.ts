import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getContacts, getMailingListStats, importContacts, refreshMailingList, removeSubscriber, syncWithOVH } from "../api/contact";

export const useGetContacts = (page: number, limit: number) => {
  return useQuery(["contacts", page, limit], () => getContacts(page, limit));
};

export const useGetMailingListStats = () => {
  return useQuery(["mailing-list-stats"], getMailingListStats);
};

export const useRefreshMailingList = () => {
  const queryClient = useQueryClient();
  return useMutation(refreshMailingList, {
    onSuccess: (data) => {
      queryClient.setQueryData(["mailing-list-stats"], data);
    },
  });
};

export const useImportContacts = () => {
  const queryClient = useQueryClient();
  return useMutation(importContacts, {
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      queryClient.invalidateQueries(["mailing-list-stats"]);
    },
  });
};

export const useSyncWithOVH = () => {
  const queryClient = useQueryClient();
  return useMutation(syncWithOVH, {
    onSuccess: () => {
      queryClient.invalidateQueries(["mailing-list-stats"]);
    },
  });
};

export const useRemoveSubscriber = () => {
  const queryClient = useQueryClient();
  return useMutation(removeSubscriber, {
    onSuccess: () => {
      queryClient.invalidateQueries(["mailing-list-stats"]);
    },
  });
};
