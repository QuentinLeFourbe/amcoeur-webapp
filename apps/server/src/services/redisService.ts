import { createClient } from "redis";
import { logger } from "../utils/logger.js";
import type { UserServerData } from "@amcoeur/types";

export const redisClient = createClient({ url: process.env.REDIS_URL || "" });

redisClient.on("connect", () => logger.info("Connected to Redis"));

redisClient.on("error", (err) => logger.error("Redis client error", err));

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

export const removeMsUserFromRedis = async (msObjectId: string) => {
  const result = await redisClient.del(`ms_${msObjectId}`);
  if (result === 0) {
    logger.warn("Cannot delete user from Redis: user not found");
  }
};
