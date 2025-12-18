import mongoose from "mongoose";

const TherapyLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  therapyType: {
    type: String,
    enum: ["speech", "occupational", "physio"],
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  progress: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

export default mongoose.model("TherapyLog", TherapyLogSchema);
