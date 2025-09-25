import express from "express";
import AcademicSchema from "../models/AcademicSchema.js";
import { authenticate } from "../middleware/auth.js";
import Term from "../models/Term.js";
import Category from "../models/Category.js";
import Subject from "../models/StudentModel.js";
import Class from "../models/Class.js";

const router = express.Router();

// POST route to add a new Academic Schema
router.post("/addAcademicSchema", authenticate, async (req, res) => {
  try {
    const { year, categId } = req.body;

    // Ensure the logged-in user is admin or principal
    const requesterRole = req.user.role;
    if (!["admin", "principal"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create an Academic Schema" });
    }

    // Validate input
    if (!year || !categId) {
      return res
        .status(400)
        .json({ message: "Year and Category ID are required" });
    }

    // Create new AcademicSchema
    const newSchema = await AcademicSchema.create({ year, categId });

    res.status(201).json({
      message: "Academic Schema created successfully",
      academicSchema: newSchema,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST route to add a new Term
router.post("/addTerm", authenticate, async (req, res) => {
  try {
    const { startDate, endDate, schemaId } = req.body;
    const requesterRole = req.user.role;

    // Only admin or principal can create a term
    if (!["admin", "principal"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create a term" });
    }

    // Validate input
    if (!startDate || !endDate || !schemaId) {
      return res
        .status(400)
        .json({ message: "startDate, endDate and schemaId are required" });
    }

    // Create new term
    const newTerm = await Term.create({
      startDate,
      endDate,
      schemaId,
    });

    res.status(201).json({
      message: "Term created successfully",
      term: newTerm,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/addCategory", authenticate, async (req, res) => {
  try {
    const { name, teacher_id, about } = req.body;
    const requesterRole = req.user.role;

    // Only admin or principal can create a category
    if (!["admin", "principal"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create a category" });
    }

    // Validate input
    if (!name || !teacher_id) {
      return res
        .status(400)
        .json({ message: "Name and teacher_id are required" });
    }

    // Create new Category
    const newCategory = await Category.create({
      name,
      teacher_id,
      about,
    });

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/addSubject", authenticate, async (req, res) => {
  try {
    const { name, categId, termId } = req.body;
    const requesterRole = req.user.role;

    // Only admin, principal, or teacher can create a subject
    if (!["admin", "principal", "teacher"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create a subject" });
    }

    // Validate input
    if (!name || !categId || !termId) {
      return res
        .status(400)
        .json({ message: "Name, categId, and termId are required" });
    }

    // Create new Subject
    const newSubject = await Subject.create({
      name,
      categId,
      termId,
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject: newSubject,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/addClass", authenticate, async (req, res) => {
  try {
    const { name, category, teacherId } = req.body;
    const requesterRole = req.user.role;

    // Only admin or principal can create a class
    if (!["admin", "principal"].includes(requesterRole)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create a class" });
    }

    // Validate input
    if (!name || !category || !teacherId) {
      return res
        .status(400)
        .json({ message: "name, category, and teacherId are required" });
    }

    // Create new Class
    const newClass = await Class.create({
      name,
      category,
      teacherId,
    });

    res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
