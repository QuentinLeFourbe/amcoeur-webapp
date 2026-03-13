import mongoose, { Schema } from "mongoose";

const answer = new Schema({
  field: { type: String, required: true },
  value: Schema.Types.Mixed,
});

const formAnswers = new Schema(
  {
    formId: { type: Schema.Types.ObjectId, required: true },
    archived: Boolean,
    note: String,
    answers: [answer],
  },
  { timestamps: true },
);

formAnswers.pre("save", async function () {
  if (typeof this.formId === "string") {
    const temp = new mongoose.Types.ObjectId(this.formId);
    this.formId = temp;
  }
});

const FormAnswers = mongoose.model("FormAnswers", formAnswers);

export default FormAnswers;
