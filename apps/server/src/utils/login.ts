import type { Request } from "express";
import { validateToken } from "../services/oauthService.js";

const blockedUsers = new Map();

export const isUserBlocked = (username: string) => {
  if (blockedUsers.has(username)) {
    const { attempts, lastAttemptTime } = blockedUsers.get(username);
    const currentTime = Date.now();

    return attempts >= 3 && currentTime - lastAttemptTime < 180000;
  }
  return false;
};

export const addUserToBlockedUsers = (username: string) => {
  if (blockedUsers.has(username)) {
    const { attempts } = blockedUsers.get(username);
    blockedUsers.set(username, {
      attempts: attempts + 1,
      lastAttemptTime: Date.now(),
    });
  } else {
    blockedUsers.set(username, {
      attempts: 1,
      lastAttemptTime: Date.now(),
    });
  }
};

export const removeUserFromBlockedUsers = (username: string) => {
  if (!username) {
    throw new Error("No user name provided");
  }
  if (blockedUsers.has(username)) {
    blockedUsers.delete(username);
  }
};

export const extractToken = async (req: Request) => {
  const authHeader = req.headers["authorization"];
  const authToken =
    authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!authToken) {
    throw new Error("Token not present");
  }
  const token = await validateToken(authToken);
  return token;
};
