import express from "express";
import AcademicSchema from "../models/AcademicSchema.js";
import { authenticate } from "../middleware/auth.js";
import Term from "../models/TermSchema.js";
import Category from "../models/CategoryModel.js";
import Subject from "../models/SubjectSchema.js";
import Class from "../models/ClassModel.js";
import Student from "../models/StudentModel.js";
import User from "../models/UserModel.js";
const router = express.Router();

// GET all teachers (admin only)
router.get("/getTeachers", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const teachers = await User.find({ role: "teacher" })
      .select("_id fullName email");

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ⭐ Create Academic Year (admin only)
router.post("/addAcademicYear", authenticate, async (req, res) => {
  try {
    const { year } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    // Check for duplicate year
    const existing = await AcademicSchema.findOne({ year });
    if (existing) {
      return res.status(400).json({ message: "Academic Year already exists" });
    }

    const newYear = await AcademicSchema.create({ year });

    res.status(201).json({
      message: "Academic Year created successfully",
      academicYear: newYear,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/getAcademicYears", authenticate, async (req, res) => {
  try {
    const years = await AcademicSchema.find().sort({ year: 1 });
    res.json({ years });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.delete("/deleteAcademicYear/:id", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    await AcademicSchema.findByIdAndDelete(req.params.id);

    res.json({ message: "Academic Year deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Term (admin only)
// Term (admin only)
router.post("/addTerm", authenticate, async (req, res) => {
  try {
    const { startDate, endDate, schemaId } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    if (!startDate || !endDate || !schemaId) {
      return res.status(400).json({
        message: "startDate, endDate and schemaId are required",
      });
    }

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
// GET all terms (admin & teacher)
router.get("/getTerms", authenticate, async (req, res) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const terms = await Term.find()
      .populate("schemaId", "year")
      .sort({ startDate: 1 });

    res.json(terms);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/addSubject", authenticate, async (req, res) => {
  try {
    const { name, categoryId, termId, teacherId } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    if (!name || !categoryId || !termId || !teacherId) {
      return res.status(400).json({
        message: "name, categoryId, termId and teacherId are required",
      });
    }

    const newSubject = await Subject.create({
      name,
      categoryId,
      termId,
      teacherId,
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject: newSubject,
    });
  } catch (err) {
    console.error("ADD SUBJECT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});



// Category (admin only)
router.post("/addCategory", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admins only" });

    const { name, about } = req.body;

    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    // Prevent duplicates
    const exists = await Category.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = await Category.create({ name, about });

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.get("/getCategories", authenticate, async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// Class (admin only)
router.post("/addClass", authenticate, async (req, res) => {
  try {
    const { name, categoryId, teacherId, academicYearId } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    if (!name || !categoryId || !teacherId || !academicYearId) {
      return res.status(400).json({
        message: "name, categoryId, teacherId and academicYearId are required",
      });
    }

    const newClass = await Class.create({
      name,
      categoryId,
      teacherId,
      academicYearId,
    });

    res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });
  } catch (err) {
    console.error("ADD CLASS ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// GET all classes (admin)
router.get("/classes", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const classes = await Class.find()
      .populate("categoryId", "name")
      .populate("teacherId", "fullName email")
      .populate("academicYearId", "year");

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// GET classes by academic year + category
router.get("/classes/filter", authenticate, async (req, res) => {
  try {
    const { academicYearId, categoryId } = req.query;

    if (!academicYearId || !categoryId) {
      return res.status(400).json({
        message: "academicYearId and categoryId are required",
      });
    }

    const classes = await Class.find({
      academicYearId,
      categoryId,
    });

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
