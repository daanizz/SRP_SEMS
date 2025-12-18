import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  about: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
