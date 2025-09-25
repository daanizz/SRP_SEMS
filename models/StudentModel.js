import mongoose from "mongoose";

const Student = new mongoose.Schema({
  dob: {
    type: Date,
  },
  behaviour: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: Number,
    required: true,
    match: [/^\d{10}$/, "Must be exactly 10 digits"],
  },
  consultantDr: {
    type: String,
  },
  drNumber: {
    type: Number,
    match: [/^\d{10}$/, "Must be exactly 10 digits"],
  },
  classID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  healthIssues: {
    type: String,
  },
  profilePath: {
    type: String,
  },
});

export default mongoose.model("Student", Student);
