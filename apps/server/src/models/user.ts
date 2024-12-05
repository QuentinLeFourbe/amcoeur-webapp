import type { User as UserType } from "@amcoeur/types";
import mongoose from "mongoose";

type UserModel = mongoose.Model<UserType, NonNullable<unknown>>;

const schema = new mongoose.Schema<UserType, UserModel>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  facebookId: {
    type: String,
    required: false,
  },
  microsoftId: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

const User = mongoose.model<UserType, UserModel>("User", schema);

export default User;
