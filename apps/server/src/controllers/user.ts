import type { UserClientData, UserServerData } from "@amcoeur/types";
import { createHash } from "crypto";
import { type Request, type Response } from "express";

import User from "../models/user.js";
import { addUserToBlacklist } from "../services/redisService.js";
import { deleteDbUser, updateDbUser } from "../services/userService.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des utilisateur.",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de l'utilisateur.",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateDbUser(req.params.id || "", req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "Utilisateur non trouvée." });
    } else {
      await addUserToBlacklist(updatedUser._id.toString());
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.locals.logger.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la modification de l'utilisateur.",
      });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteDbUser(req.params.id || "");
    if (!deletedUser) {
      res.status(404).json({ message: "Utilisateur non trouvée." });
    } else {
      await addUserToBlacklist(deletedUser._id.toString());
      res.status(200).json({ message: "Utilisateur supprimée avec succès." });
    }
  } catch (err) {
    res.locals.logger.error(err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la suppression de l'utilisateur.",
      });
    }
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la déconnexion.",
    });
  }
};

export const getCurrentUserFromToken = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user as UserServerData;
    if (!user) {
      return res.status(404).send();
    }

    const clientUser = {
      fullname: user.fullname,
      permissions: user.permissions,
      _id: user._id.toString(),
    } as UserClientData;
    return res.status(200).send(clientUser);
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send({
      message: "An error occured while getting user.",
      error: err,
    });
  }
};

export const generateCodeChallenge = (req: Request, res: Response) => {
  const { codeVerifier } = req.body;

  if (!codeVerifier) {
    return res.status(400).json({ error: "codeVerifier is required" });
  }

  // Hachage SHA-256 du code verifier
  const hash = createHash("sha256").update(codeVerifier).digest();

  // Encode en base64-url
  const codeChallenge = hash
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return res.status(200).json(codeChallenge);
};
