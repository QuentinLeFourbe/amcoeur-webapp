import mongoose from "mongoose";
import crypto from "crypto";
import type { User as UserType, UserMethods } from "@amcoeur/types";

type UserModel = mongoose.Model<UserType, NonNullable<unknown>, UserMethods>;

const schema = new mongoose.Schema<UserType, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});

schema.method("setPassword", function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
});

schema.method("validPassword", function (password: string) {
  if (!this.salt) return false;

  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`) as string;
  return this.hash === hash;
});

const User = mongoose.model<UserType, UserModel>("User", schema);

export default User;
