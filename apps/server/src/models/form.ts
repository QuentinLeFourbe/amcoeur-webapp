import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  id: { type: String, required: true },
  questionId: { type: Schema.ObjectId, required: true },
  isRequired: Boolean,
  isFullLine: Boolean,
  showOnlyInput: Boolean,
  showPlaceholder: Boolean,
});

const blocSchema = new Schema({
  id: { type: String, required: true },
  title: String,
  questions: [questionSchema],
  isCompact: Boolean,
});

const form = new Schema({
  name: { type: String, required: true },
  blocks: [blocSchema],
});

const Form = mongoose.model("Form", form);

export default Form;
