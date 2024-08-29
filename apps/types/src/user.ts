import type mongoose from "mongoose";

export type UserPermission = "admin" | "inactive" | "forms" | "pages";

export type User = {
  fullname?: string;
  facebookId?: string;
  microsoftId?: string;
  googleId?: string;
  email?: string;
  permissions: UserPermission[];
};

export type UserClientData = Pick<
  User,
  "permissions" | "fullname" | "email"
> & {
  _id: string;
};

export type UserServerData = User & {
  _id: mongoose.Types.ObjectId;
};
