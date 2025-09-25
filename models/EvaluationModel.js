import mongoose from "mongoose";
const evaluationSchema = new mongoose.Schema({
  stdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  techrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  marks: { type: Number, required: true },
  remarks: { type: String },
});

export default mongoose.model("Evaluation", evaluationSchema);
