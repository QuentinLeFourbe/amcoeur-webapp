import mongoose, { Schema } from "mongoose";

const fieldSchema = new Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true },
  choices: [String],
  isRequired: Boolean,
});

const form = new Schema(
  {
    name: { type: String, required: true },
    fields: [fieldSchema],
  },
  { timestamps: true },
);

const Form = mongoose.model("Form", form);

export default Form;
