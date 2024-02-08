import mongoose, { Schema } from "mongoose";

const page = new Schema(
  {
    name: { type: String, required: true },
    route: { type: String, required: true },
    components: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

const Page = mongoose.model("Page", page);

export default Page;
