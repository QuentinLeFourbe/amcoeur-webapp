import type { Contact as ContactType } from "@amcoeur/types";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema<ContactType>(
  {
    lastName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    zipCode: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model<ContactType>("Contact", contactSchema);

export default Contact;
