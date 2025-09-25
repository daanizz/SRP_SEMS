import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  termId: { type: mongoose.Schema.Types.ObjectId, ref: "Term", required: true },
});

export default mongoose.model("Subject", subjectSchema);
