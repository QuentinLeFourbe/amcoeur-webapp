import mongoose from "mongoose";
import crypto from "crypto";
import { User, UserMethods } from "@amcoeur/types";

type UserModel = mongoose.Model<User, {}, UserMethods>;

const schema = new mongoose.Schema<User, UserModel, UserMethods>({
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

const User = mongoose.model<User, UserModel>("User", schema);

export default User;
