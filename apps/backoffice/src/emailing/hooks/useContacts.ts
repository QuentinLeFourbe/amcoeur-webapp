import { Contact, EmailCampaignDto } from "@amcoeur/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { 
  createContact, 
  deleteContact, 
  getContacts, 
  getMailingListStats, 
  getSyncStatus,
  importContacts, 
  refreshMailingList, 
  removeSubscriber, 
  sendEmailCampaign, 
  syncWithOVH 
} from "../api/contact";

export const useGetContacts = (page: number, limit: number, search: string = "") => {
  return useQuery(["contacts", page, limit, search], () => getContacts(page, limit, search));
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation((contactData: Partial<Contact>) => createContact(contactData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteContact(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
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

export const useSyncWithOVH = () => {
  const queryClient = useQueryClient();
  return useMutation((dryRun: boolean = false) => syncWithOVH(dryRun), {
    onSuccess: (_data, variables) => {
      // Only invalidate if it was not a dry run
      if (variables === false) {
        queryClient.invalidateQueries(["mailing-list-stats"]);
      }
    },
  });
};

export const useSyncStatus = (jobId: string | null) => {
  return useQuery(["sync-status", jobId], () => getSyncStatus(jobId!), {
    enabled: !!jobId,
    refetchInterval: (data) => {
      if (data?.status === "completed" || data?.status === "failed") {
        return false;
      }
      return 2000;
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

export const useRemoveSubscriber = () => {
  const queryClient = useQueryClient();
  return useMutation(removeSubscriber, {
    onSuccess: () => {
      queryClient.invalidateQueries(["mailing-list-stats"]);
    },
  });
};

export const useSendEmailCampaign = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: (campaign: EmailCampaignDto) => sendEmailCampaign(campaign),
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });
};
