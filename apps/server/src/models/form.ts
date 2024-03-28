import mongoose, { Schema } from "mongoose";

const form = new Schema({
  name: {type:String, required: true},
  questions: [String]
})

const Form = mongoose.model("Form", form)

export default Form
