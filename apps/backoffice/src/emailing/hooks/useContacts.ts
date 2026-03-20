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
  return useQuery({
    queryKey: ["contacts", page, limit, search],
    queryFn: () => getContacts(page, limit, search),
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactData: Partial<Contact>) => createContact(contactData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useGetMailingListStats = () => {
  return useQuery({
    queryKey: ["mailing-list-stats"],
    queryFn: getMailingListStats,
  });
};

export const useRefreshMailingList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refreshMailingList,
    onSuccess: (data) => {
      queryClient.setQueryData(["mailing-list-stats"], data);
    },
  });
};

export const useSyncWithOVH = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dryRun: boolean = false) => syncWithOVH(dryRun),
    onSuccess: (_data, variables) => {
      // Only invalidate if it was not a dry run
      if (variables === false) {
        queryClient.invalidateQueries({ queryKey: ["mailing-list-stats"] });
      }
    },
  });
};

export const useSyncStatus = (jobId: string | null) => {
  return useQuery({
    queryKey: ["sync-status", jobId],
    queryFn: () => getSyncStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (data) => {
      if (data?.state?.data?.status === "completed" || data?.state?.data?.status === "failed") {
        return false;
      }
      return 2000;
    },
  });
};

export const useImportContacts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: importContacts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["mailing-list-stats"] });
    },
  });
};

export const useRemoveSubscriber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeSubscriber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailing-list-stats"] });
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
