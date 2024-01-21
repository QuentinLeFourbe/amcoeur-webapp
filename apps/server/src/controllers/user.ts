import { Request, Response } from "express";
import User from "../models/user";
import jwt, { Secret } from "jsonwebtoken";

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
          message: "User Logged In",
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "An error occured while logging in.",
      error: err,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log({ body: req.body });
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        message: "Missing username or password.",
      });
    }

    let newUser = new User();
    newUser.username = req.body.username;
    newUser.setPassword(req.body.password);
    await newUser.save();
    res.status(201).send({
      message: "User added successfully.",
    });
  } catch (err) {
    return res.status(400).send({
      message: "Failed to add user.",
      err,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
