import mongoose, { Schema } from "mongoose";

const page = new Schema({
  title: String,
  route: String,
  content: String,
});

const Page = mongoose.model("Page", page);

export default Page;
