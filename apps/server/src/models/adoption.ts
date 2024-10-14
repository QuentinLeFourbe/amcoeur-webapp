import mongoose, { Schema } from "mongoose";

const adoption = new Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    race: { type: String, required: false },
    gender: { type: String, required: true },
    birthday: { type: Date, required: false },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    visible: { type: Boolean, required: false },
    archived: { type: Boolean, required: false },
    commentary: { type: String, required: false },
  },

  { timestamps: true },
);

const Adoption = mongoose.model("Adoption", adoption);

export default Adoption;
