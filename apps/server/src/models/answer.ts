import mongoose, { Schema } from "mongoose";

const answer = new Schema({
  formId: { type: String, required: true },
  questionId: { type: String, required: true },
  values: [Schema.Types.Mixed],
});

const Answer = mongoose.model("Answer", answer);

export default Answer;
