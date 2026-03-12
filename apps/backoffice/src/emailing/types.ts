export interface SyncSummary {
  toAddCount: number;
  toRemoveCount: number;
  ignoredUnsubscribedCount: number;
  alreadyInOvhCount: number;
  invalidFormatCount: number;
  added?: number;
  removed?: number;
  errors?: number;
}

export interface SyncJobStatus {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  total: number;
  processed: number;
  added: number;
  removed: number;
  errors: number;
  error?: string;
}

export interface MutationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: {
    summary: SyncSummary;
    jobId?: string;
  };
  error?: unknown;
}
