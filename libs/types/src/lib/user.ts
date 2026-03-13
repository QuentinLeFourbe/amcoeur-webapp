import type mongoose from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  INACTIVE = "inactive",
  WEBSITE_EDITOR = "website_editor",
  ADOPTION_MANAGER = "adoption_manager",
  CONTACT_MANAGER = "contact_manager",
  EMAILING_MANAGER = "emailing_manager",
  
  // Rétrocompatibilité
  FORMS = "forms",
  PAGES = "pages",
}

export type UserPermission = UserRole | string;

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
