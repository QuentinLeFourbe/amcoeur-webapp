import type { Request, Response, NextFunction } from "express";
import { extractToken } from "../utils/login.js";
import type { MicrosoftToken } from "../types/oauth.js";
import { getOrCreateMsUser } from "../services/userService.js";
import {
  addMsUserToRedis,
  getMsUserFromRedis,
} from "../services/redisService.js";
import type { UserServerData } from "@amcoeur/types";
import { checkUserPermissions } from "../utils/user.js";
import User from "../models/user.js";

const extractUser = async (req: Request, res: Response) => {
  const token = (await extractToken(req)) as MicrosoftToken;
  let user;
  try {
    user = await getMsUserFromRedis(token.oid);
  } catch {
    user = await getOrCreateMsUser(token);
    addMsUserToRedis(user, token.exp);
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
