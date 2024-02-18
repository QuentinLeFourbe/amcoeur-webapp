import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { isUserBlocked } from "../utils/login";

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

export const limitAttempts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const username = req.body.username; // Assure-toi que tu récupères le nom d'utilisateur correctement depuis la requête
  if (isUserBlocked(username)) {
    return res
      .status(401)
      .json({ error: "Utilisateur bloqué. Réessayez dans 10 minutes." });
  }
  next();
};
