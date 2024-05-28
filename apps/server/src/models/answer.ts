import mongoose, { Schema } from "mongoose";

const answer = new Schema({
  field: { type: String, required: true },
  value: Schema.Types.Mixed,
});

const formAnswers = new Schema(
  {
    formId: { type: String, required: true },
    answers: [answer],
  },
  { timestamps: true },
);

const FormAnswers = mongoose.model("FormAnswers", formAnswers);

export default FormAnswers;
