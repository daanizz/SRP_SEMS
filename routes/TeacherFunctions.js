import express from "express";
import Update from "../models/UpdatesModel.js";
import { authenticate } from "../middleware/auth.js";
import Evaluation from "../models/EvaluationModel.js";
import Student from "../models/StudentModel.js";

const router = express.Router();

// ⭐ Add Student (teacher/admin)
// ⭐ Add Student (teacher/admin)
router.post("/students/add", authenticate, async (req, res) => {
  try {
    if (!["teacher", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only teacher/admin can add students" });
    }

    const student = await Student.create(req.body);

    return res.status(201).json({
      message: "Student created successfully",
      student,
    });

  } catch (err) {
    console.error("Add student error:", err);
    return res.status(500).json({
      message: "Failed to create student",
      error: err.message,
    });
  }
});
// Subject (admin or teacher)



// POST route to add a new Update (teacher/admin)
router.post("/addUpdate", authenticate, async (req, res) => {
  try {
    const { studentId, updateMessage } = req.body;
    const requesterRole = req.user.role;
    const teacherId = req.user.id;

    if (!["teacher", "admin"].includes(requesterRole)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    if (!studentId || !updateMessage) {
      return res.status(400).json({ message: "studentId and updateMessage are required" });
    }

    const newUpdate = await Update.create({ teacherId, studentId, updateMessage });
    res.status(201).json({ message: "Update created successfully", update: newUpdate });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/addEvaluation", authenticate, async (req, res) => {
  try {
    const { stdId, subjectId, marks, remarks, termId } = req.body;
    const requesterRole = req.user.role;
    const techrId = req.user.id;

    if (!["teacher", "admin"].includes(requesterRole)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    if (!stdId || !subjectId || marks == null || !termId) {
      return res.status(400).json({ message: "stdId, subjectId, marks, and termId are required" });
    }

    const newEvaluation = await Evaluation.create({ stdId, techrId, subjectId, marks, remarks, termId });
    res.status(201).json({ message: "Evaluation created successfully", evaluation: newEvaluation });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update student (teacher/admin)
router.put("/students/:id", authenticate, async (req, res) => {
  try {
    if (!["teacher", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const studentId = req.params.id;
    const updates = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET classes by academic year + category

// GET classes for logged-in teacher
router.get("/teacher/classes", authenticate, async (req, res) => {
  try {
    if (!["teacher", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const classes = await Class.find({
      teacherId: req.user.id,
    })
      .populate("categoryId", "name")
      .populate("academicYearId", "year");

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
