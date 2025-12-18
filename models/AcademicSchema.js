import mongoose from "mongoose";

const academicSchema = new mongoose.Schema({
  year: { type: String, required: true }
});

export default mongoose.model("AcademicSchema", academicSchema);
