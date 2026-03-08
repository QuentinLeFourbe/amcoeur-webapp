import { UserRole } from "@amcoeur/types";
import type { UserServerData, UserPermission } from "@amcoeur/types";
import type { NextFunction, Request, Response } from "express";

import User from "../models/user.js";
import {
  addGoogleUserToRedis,
  addMsUserToRedis,
  getGoogleUserFromRedis,
  getMsUserFromRedis,
} from "../services/redisService.js";
import {
  getOrCreateGoogleUser,
  getOrCreateMsUser,
} from "../services/userService.js";
import type { JWTToken } from "../types/oauth.js";
import { extractToken } from "../utils/login.js";
import { checkUserPermissions } from "../utils/user.js";

const extractUser = async (req: Request, res: Response) => {
  const token = (await extractToken(req)) as JWTToken;

  let provider: "microsoft" | "google" | undefined;

  if (token.iss.includes("microsoft")) {
    provider = "microsoft";
  } else if (token.iss.includes("google")) {
    provider = "google";
  }

  let user;
  try {
    if (provider === "microsoft") {
      user = await getMsUserFromRedis(token.oid);
    } else if (provider === "google") {
      user = await getGoogleUserFromRedis(token.sub);
    }
  } catch {
    if (provider === "microsoft") {
      user = await getOrCreateMsUser(token);
      addMsUserToRedis(user, token.exp);
    } else if (provider === "google") {
      user = await getOrCreateGoogleUser(token);
      addGoogleUserToRedis(user, token.exp);
    }
  }

  if (
    user?.microsoftId === process.env.ADMIN_MS_ID &&
    (!checkUserPermissions(user as UserServerData, [UserRole.ADMIN]) ||
      checkUserPermissions(user as UserServerData, [UserRole.INACTIVE]))
  ) {
    user = await User.findByIdAndUpdate(
      user?._id,
      { permissions: [UserRole.ADMIN] },
      { new: true },
    );
  }

  res.locals.user = user;
};

/**
 * Generic middleware to check if user has required permissions
 */
export const requiresPermission = (...permissions: UserPermission[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await extractUser(req, res);
      const user = res.locals.user as UserServerData;
      
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (checkUserPermissions(user, [UserRole.INACTIVE])) {
        return res.status(401).json({ message: "Account inactive" });
      }

      // Admin has all rights
      if (checkUserPermissions(user, [UserRole.ADMIN])) {
        return next();
      }

      // If no specific permissions required, just being active is enough
      if (permissions.length === 0) {
        return next();
      }

      // Check if user has any of the required permissions
      if (checkUserPermissions(user, permissions)) {
        return next();
      }

      res.locals.logger.warn(`User ${user.email} attempted unauthorized access to ${req.originalUrl}`);
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    } catch (error) {
      res.locals.logger.error(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export const requiresLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await extractUser(req, res);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Convenience aliases for common checks
export const requiresActive = requiresPermission();
export const requiresAdmin = requiresPermission(UserRole.ADMIN);
