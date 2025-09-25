import express from "express";
import Update from "../models/Update.js";
import { authenticate } from "../middleware/auth.js";
import Evaluation from "../models/Evaluation.js";
import Student from "../models/Student.js";

const router = express.Router();

// POST route to add a new Update
router.post("/addUpdate", authenticate, async (req, res) => {
  try {
    const { studentId, updateMessage } = req.body;
    const requesterRole = req.user.role;
    const teacherId = req.user.id; // logged-in teacher/principal ID

    // Only teacher or principal can create an update
    if (!["teacher", "principal"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create an update" });
    }

    // Validate input
    if (!studentId || !updateMessage) {
      return res
        .status(400)
        .json({ message: "studentId and updateMessage are required" });
    }

    // Create new Update
    const newUpdate = await Update.create({
      teacherId,
      studentId,
      updateMessage,
    });

    res.status(201).json({
      message: "Update created successfully",
      update: newUpdate,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/addEvaluation", authenticate, async (req, res) => {
  try {
    const { stdId, subjectId, marks, remarks, termId } = req.body;
    const requesterRole = req.user.role;
    const techrId = req.user.id; // logged-in teacher/principal

    // Only teacher or principal can create an evaluation
    if (!["teacher", "principal"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create an evaluation" });
    }

    // Validate input
    if (!stdId || !subjectId || marks == null || !termId) {
      return res
        .status(400)
        .json({ message: "stdId, subjectId, marks, and termId are required" });
    }

    // Create new Evaluation
    const newEvaluation = await Evaluation.create({
      stdId,
      techrId,
      subjectId,
      marks,
      remarks,
      termId,
    });

    res.status(201).json({
      message: "Evaluation created successfully",
      evaluation: newEvaluation,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/updateStudent/:id", authenticate, async (req, res) => {
  try {
    const studentId = req.params.id;
    const requesterRole = req.user.role;
    const updates = req.body;

    // Only admin, principal, or the student themselves can update
    if (
      !["admin", "principal"].includes(requesterRole) &&
      req.user.id !== studentId
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this student" });
    }

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
