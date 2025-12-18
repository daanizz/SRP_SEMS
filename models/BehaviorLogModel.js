import mongoose from "mongoose";

const BehaviorLogSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: ["happy", "neutral", "sad"],
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  incidents: {
    type: Number,
    default: 0,
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

export default mongoose.model("BehaviorLog", BehaviorLogSchema);
