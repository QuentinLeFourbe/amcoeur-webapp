import type { UserServerData } from "@amcoeur/types";
import { createClient } from "redis";

import { logger } from "../utils/logger.js";
import { cacheOperationsTotal } from "./metricsService.js";

export const redisClient = createClient({ url: process.env.REDIS_URL || "" });

redisClient.on("connect", () => logger.info("Connected to Redis"));

redisClient.on("error", (err) => logger.error("Redis client error", err));

/**
 * Fonctions de mise en cache génériques instrumentées
 */
export const setCache = async (key: string, value: unknown, ttlInSeconds = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlInSeconds,
    });
    cacheOperationsTotal.inc({ operation: "set", result: "success" });
  } catch (error) {
    logger.error(`Erreur lors de l'écriture dans le cache Redis (clé: ${key})`, error);
    cacheOperationsTotal.inc({ operation: "set", result: "error" });
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    if (!data) {
      cacheOperationsTotal.inc({ operation: "get", result: "miss" });
      return null;
    }
    cacheOperationsTotal.inc({ operation: "get", result: "hit" });
    return JSON.parse(data) as T;
  } catch (error) {
    logger.error(`Erreur lors de la lecture du cache Redis (clé: ${key})`, error);
    cacheOperationsTotal.inc({ operation: "get", result: "error" });
    return null;
  }
};

export const invalidateCache = async (key: string) => {
  try {
    await redisClient.del(key);
    cacheOperationsTotal.inc({ operation: "del", result: "success" });
  } catch (error) {
    logger.error(`Erreur lors de l'invalidation du cache Redis (clé: ${key})`, error);
    cacheOperationsTotal.inc({ operation: "del", result: "error" });
  }
};

export const addUserToBlacklist = async (userId: string) => {
  await redisClient.set(`bl_${userId}`, Date.now(), {
    EX: 7 * 24 * 60 * 60, // 7 days in seconds
  });
};

export const getUserBlacklistTime = async (userId: string) => {
  const timestamp = await redisClient.get(`bl_${userId}`);
  if (!timestamp) {
    return null;
  }
  return parseInt(timestamp, 10);
};

export const addMsUserToRedis = async (
  user: UserServerData,
  tokenExp: number,
) => {
  const expiresIn = tokenExp - Math.floor(Date.now() / 1000);
  await redisClient.set(`ms_${user.microsoftId}`, JSON.stringify(user), {
    EX: expiresIn,
  });
};

export const addGoogleUserToRedis = async (
  user: UserServerData,
  tokenExp: number,
) => {
  const expiresIn = tokenExp - Math.floor(Date.now() / 1000);
  await redisClient.set(`google_${user.googleId}`, JSON.stringify(user), {
    EX: expiresIn,
  });
};

export const getMsUserFromRedis = async (msObjectId: string) => {
  try {
    const stringifiedUser = await redisClient.get(`ms_${msObjectId}`);
    if (!stringifiedUser) {
      throw Error("No Microsoft user found for msObjectId: " + msObjectId);
    }
    const parsedUser = JSON.parse(stringifiedUser);
    return parsedUser;
  } catch (error) {
    throw Error(`Cannot find MS user in redis db: ${error} `);
  }
};

export const getGoogleUserFromRedis = async (googleObjectId: string) => {
  try {
    const stringifiedUser = await redisClient.get(`google_${googleObjectId}`);
    if (!stringifiedUser) {
      throw Error("No Google user found for googleObjectId: " + googleObjectId);
    }
    const parsedUser = JSON.parse(stringifiedUser);
    return parsedUser;
  } catch (error) {
    throw Error(`Cannot find Google user in redis db: ${error} `);
  }
};

export const removeMsUserFromRedis = async (msObjectId: string) => {
  const result = await redisClient.del(`ms_${msObjectId}`);
  if (result === 0) {
    logger.warn("Cannot delete user from Redis: user not found");
  }
};

export const removeGoogleUserFromRedis = async (googleObjectId: string) => {
  const result = await redisClient.del(`google_${googleObjectId}`);
  if (result === 0) {
    logger.warn("Cannot delete user from Redis: user not found");
  }
};
