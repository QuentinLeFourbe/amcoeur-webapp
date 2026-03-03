import type { Unsubscribe as UnsubscribeType } from "@amcoeur/types";
import mongoose from "mongoose";

const unsubscribeSchema = new mongoose.Schema<UnsubscribeType>({
  email: {
    type: String,
    required: true,
  },
  unsubscribedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sentToAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Unsubscribe = mongoose.model<UnsubscribeType>(
  "Unsubscribe",
  unsubscribeSchema,
);

export default Unsubscribe;
