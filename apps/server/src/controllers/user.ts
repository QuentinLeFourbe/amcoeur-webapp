import User from "../models/user.js";
import { type Request, type Response } from "express";
import jwt, { type Secret } from "jsonwebtoken";
import {
  addUserToBlockedUsers,
  removeUserFromBlockedUsers,
} from "../utils/login.js";

export const login = async (req: Request, res: Response) => {
  // Find user with requested email
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password as string)) {
        const authToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET as Secret,
          { expiresIn: "1h" },
        );
        res.cookie("authToken", authToken, { httpOnly: true, secure: true });
        return res.status(201).send({
          _id: user._id,
          username: user.username,
        });
      } else {
        addUserToBlockedUsers(req.body.username);
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send({
      message: "An error occured while logging in.",
      error: err,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        message: "Missing username or password.",
      });
    }

    const newUser = new User();
    newUser.username = req.body.username;
    newUser.setPassword(req.body.password);
    await newUser.save();
    return res.status(201).send({
      message: "User added successfully.",
    });
  } catch (err) {
    return res.status(400).send({
      message: "Failed to add user.",
      err,
    });
  }
};

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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "Utilisateur non trouvée." });
    } else {
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

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const password = await req.body.password;
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else if (!password) {
      res.status(400).json({ message: "Please provide a password" });
    } else {
      user.setPassword(req.body.password);
      user.save();
      res.status(200).json(user);
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
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "Utilisateur non trouvée." });
    } else {
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
    res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    res.locals.logger.error(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la déconnexion.",
    });
  }
};

export const getCurrentUserFromToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).send({
        message: "No token provided.",
      });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret,
    ) as { userId: string };
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    return res.status(200).send({
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send({
      message: "An error occured while getting user.",
      error: err,
    });
  }
};

export const unblockUser = (req: Request, res: Response) => {
  const username = req.body.username;

  if (username) {
    removeUserFromBlockedUsers(username);
    res.status(200).send({
      message: "User unblocked",
    });
  } else {
    res.status(500).send({
      message: "No username provided",
    });
  }
};
