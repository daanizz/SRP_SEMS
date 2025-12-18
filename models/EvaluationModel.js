import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    termId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
    required: true,
  },

    score: {
    type: Number, // 0–100 OR 1–5 scale
    required: true,
  },
    remarks: String,
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
     evaluatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  },
  { timestamps: true } // ⭐ THIS IS THE KEY
);


export default mongoose.model("Evaluation", evaluationSchema);
