import mongoose from "mongoose";
import type { User as UserType } from "@amcoeur/types";

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
    required: true,
  },
  isAdmin: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
});

const User = mongoose.model<UserType, UserModel>("User", schema);

export default User;
