import mongoose, { Schema } from "mongoose";

const question = new Schema({
  label: {type:String, required: true},
  type: {type: String, required: true} 
})

const Question = mongoose.model("Question", question)

export default Question
