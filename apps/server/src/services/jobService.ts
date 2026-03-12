import { getCache, setCache } from "./redisService.js";

export interface SyncJob {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  total: number;
  processed: number;
  added: number;
  removed: number;
  errors: number;
  startedAt: Date;
  updatedAt: Date;
  error?: string;
}

const JOB_PREFIX = "sync_job_";

export const createSyncJob = async (id: string, total: number): Promise<SyncJob> => {
  const job: SyncJob = {
    id,
    status: "pending",
    total,
    processed: 0,
    added: 0,
    removed: 0,
    errors: 0,
    startedAt: new Date(),
    updatedAt: new Date(),
  };
  await setCache(`${JOB_PREFIX}${id}`, job, 3600 * 2); // TTL 2h
  return job;
};

export const updateSyncJob = async (id: string, updates: Partial<SyncJob>): Promise<void> => {
  const job = await getSyncJob(id);
  if (job) {
    const updatedJob = { ...job, ...updates, updatedAt: new Date() };
    await setCache(`${JOB_PREFIX}${id}`, updatedJob, 3600 * 2);
  }
};

export const getSyncJob = async (id: string): Promise<SyncJob | null> => {
  return await getCache<SyncJob>(`${JOB_PREFIX}${id}`);
};
