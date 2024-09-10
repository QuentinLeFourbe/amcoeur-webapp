import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

const adoption = new Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    race: { type: String, required: false },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    visible: { type: boolean, required: false },
    archived: { type: boolean, required: false },
    commentary: { type: String, required: false },
  },

  { timestamps: true },
);

const Adoption = mongoose.model("Adoption", adoption);

export default Adoption;
