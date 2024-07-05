import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";

const extractToken = (req: Request) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    throw new Error("Token not present");
  }
  const token = jwt.verify(authToken, process.env["JWT_SECRET"] as Secret);
  return token;
};

export const requiresLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    extractToken(req);
    next();
    return;
  } catch (error) {
    res.locals.logger.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requiresActive = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractToken(req);
    const isActive = (token as JwtPayload).isActive;
    if (!isActive) {
      res.locals.logger.error({ message: "User not active" });
      return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
  } catch (error) {
    res.locals.logger.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requiresAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractToken(req);
    const isActive = (token as JwtPayload).isActive;
    if (!isActive) {
      res.locals.logger.error({ message: "User not active" });
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isAdmin = (token as JwtPayload).isAdmin;
    if (!isAdmin) {
      res.locals.logger.error({ message: "User not admin" });
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    res.locals.logger.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
