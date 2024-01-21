import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const requiresLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      throw new Error("Token non présent");
    }
    jwt.verify(authToken, process.env.JWT_SECRET as Secret);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Non autorisé" });
  }
};
