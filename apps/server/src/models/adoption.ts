import mongoose, { Schema } from "mongoose";

const contactAnswer = new Schema({
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  motivation: { type: String, required: true },
});

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
    emergency: { type: Boolean, required: false },
    adopted: { type: Boolean, required: false },
    commentary: { type: String, required: false },
    responsesList: [contactAnswer],
  },
  { timestamps: true },
);

const Adoption = mongoose.model("Adoption", adoption);

export default Adoption;
