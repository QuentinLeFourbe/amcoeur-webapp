import { isUserBlocked } from "../utils/login.js";
import type { Request, Response, NextFunction } from "express";
import jwt, {type Secret } from "jsonwebtoken";

export const requiresLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      throw new Error("Token not present");
    }
    jwt.verify(authToken, process.env["JWT_SECRET"] as Secret);
    next();
    return;
  } catch (error) {
    res.locals.logger.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const limitAttempts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const username = req.body.username; 
  if (isUserBlocked(username)) {
    res.locals.logger.error("User blocked. Try in 10 minutes.");
    return res
      .status(401)
      .json({ error: "User blocked. Try again in 10 minutes." });
  }
  next();
  return;
};
