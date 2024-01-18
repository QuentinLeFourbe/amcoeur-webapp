import mongoose, { Schema } from "mongoose";

const page = new Schema(
  {
    name: { type: String, required: true },
    route: String,
    components: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true },
);

const Page = mongoose.model("Page", page);

export default Page;
