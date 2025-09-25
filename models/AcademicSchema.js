import mongoose from "mongoose";

const academicSchema = new mongoose.Schema({
  year: { type: String, required: true },
  categId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model("AcademicSchema", academicSchema);
