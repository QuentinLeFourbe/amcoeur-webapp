import type { UserServerData } from "@amcoeur/types";
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
      user = await getGoogleUserFromRedis(token.sub); //l'ID est le sub pour l'auth Google
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
    (!checkUserPermissions(user as UserServerData, ["admin"]) ||
      checkUserPermissions(user as UserServerData, ["inactive"]))
  ) {
    user = await User.findByIdAndUpdate(
      user?._id,
      { permissions: ["admin"] },
      {
        new: true,
      },
    );
  }

  res.locals.user = user;
};

export const requiresLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await extractUser(req, res);
    next();
    return;
  } catch (error) {
    res.locals.logger.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requiresActive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await extractUser(req, res);
    const user = res.locals.user as UserServerData;
    if (checkUserPermissions(user, ["inactive"])) {
      res.locals.logger.error({ message: "User not active" });
      return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
  } catch (error) {
    res.locals.logger.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requiresAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await extractUser(req, res);
    const user = res.locals.user as UserServerData;
    if (checkUserPermissions(user, ["inactive"])) {
      res.locals.logger.error({ message: "User not active" });
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (checkUserPermissions(user, ["admin"]) === false) {
      res.locals.logger.error({ message: "User not admin" });
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    res.locals.logger.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
