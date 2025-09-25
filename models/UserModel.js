import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Teacher", "Principal", "Staff", "Student"],
    },
    contactNumber: {
      type: String,
      match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
