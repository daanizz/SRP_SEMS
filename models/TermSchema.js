import mongoose from "mongoose";
const termSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  schemaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicSchema",
    required: true,
  },
});

export default mongoose.model("Term", termSchema);
