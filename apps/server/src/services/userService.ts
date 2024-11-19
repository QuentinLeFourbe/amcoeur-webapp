import type { User as UserType,UserServerData } from "@amcoeur/types";

import User from "../models/user.js";
import { sendEmail } from "../services/mailService.js";
import type { MicrosoftToken } from "../types/oauth.js";
import { checkUserPermissions } from "../utils/user.js";
import { removeMsUserFromRedis } from "./redisService.js";

export const sendAccountNotificationEmail = async (
  user: Pick<UserType, "fullname" | "email">,
  isActive: boolean,
  isAdmin: boolean,
) => {
  const mailOptions = {
    to: process.env.ADMIN_EMAIL,
    subject: `Amcoeur - Nouvel utilisateur à valider: ${user.fullname}`,
    text: `Un nouvel utilisateur sans accès à essayé de se connecter:\nNom: ${user.fullname}\nEmail: ${user.email}\nUtilisateur actif: ${isActive}\nAdmin: ${isAdmin}`,
  };
  await sendEmail(mailOptions);
};

export const getOrCreateMsUser = async (msToken: MicrosoftToken) => {
  const { oid } = msToken;

  let user = await User.findOne({ microsoftId: oid });

  if (!user) {
    user = await createUser({
      microsoftId: oid,
      email: msToken.email,
      fullname: msToken.name,
    });
  }

  return user;
};

export const updateDbUser = async (userId: string, user: UserServerData) => {
  const updatedUser = await User.findOneAndUpdate({ _id: userId }, user, {
    new: true,
  });
  if (updatedUser?.microsoftId) {
    removeMsUserFromRedis(updatedUser.microsoftId);
  }
  return updatedUser;
};

export const createUser = async (
  user: Pick<UserType, "microsoftId" | "facebookId" | "fullname" | "email">,
) => {
  const dbUser = new User();
  dbUser.fullname = user.fullname || "";
  dbUser.facebookId = user.facebookId || "";
  dbUser.microsoftId = user.microsoftId || "";
  dbUser.email = user.email || "";
  if (user.microsoftId === process.env.ADMIN_MS_ID) {
    dbUser.permissions = ["admin"];
  } else {
    dbUser.permissions = ["inactive"];
  }
  await dbUser.save();

  sendAccountNotificationEmail(
    { fullname: dbUser.fullname, email: dbUser.email },
    checkUserPermissions(dbUser, ["inactive"]),
    checkUserPermissions(dbUser, ["admin"]),
  );

  return dbUser;
};

export const deleteDbUser = async (id: string) => {
  const deletedUser = await User.findOneAndDelete({ _id: id });
  if (deletedUser?.microsoftId) {
    removeMsUserFromRedis(deletedUser.microsoftId);
  }
  return deletedUser;
};
