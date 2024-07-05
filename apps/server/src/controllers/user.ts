import User from "../models/user.js";
import { type Request, type Response } from "express";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import axios from "axios";

export const facebookLogin = (_req: Request, res: Response) => {
  return res.send(`https://www.facebook.com/v11.0/dialog/oauth?
client_id=${process.env.FACEBOOK_CLIENT_ID}
&scope=openid
&response_type=code
&redirect_uri=http://localhost:3000/api/users/login/facebook/callback
`);
};

export const processFacebookCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code;
    const oauthResponse = await axios.get(
      "https://graph.facebook.com/v11.0/oauth/access_token?" +
        `client_id=${process.env.FACEBOOK_CLIENT_ID}` +
        `&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}` +
        `&code=${code}` +
        `&redirect_uri=http://localhost:3000/api/users/login/facebook/callback`,
    );
    const jwtToken = oauthResponse.data.id_token;
    const oauthToken = jwt.decode(jwtToken) as JwtPayload;

    let user;
    user = await User.findOne({ facebookId: oauthToken.sub });
    if (user === null) {
      user = new User();
      if (oauthToken.sub) {
        user.facebookId = oauthToken.sub;
      } else {
        throw Error("No user id found in the access token");
      }
      user.fullname = oauthToken.name || "";
      user.email = oauthToken.email || "";
      user.isAdmin = false;
      user.isActive = false;
      await user.save();
    }

    const authToken = jwt.sign(
      {
        userId: user._id.toString(),
        facebookId: user.facebookId,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "2d" },
    );
    res.cookie("authToken", authToken, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    return res.redirect("/administration");
  } catch (e) {
    res.locals.logger.error(e);
    return res
      .status(500)
      .send({ message: "Cannot verify Facebook oauth code", error: e });
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
      return res.status(204).send();
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
      fullname: user.fullname,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.locals.logger.error(err);
    return res.status(500).send({
      message: "An error occured while getting user.",
      error: err,
    });
  }
};
