// TherapyRoutes.js
import express from "express";
import TherapyLog from "../models/TherapyLogModel.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, async (req, res) => {
  try {
    if (!["teacher", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    const log = await TherapyLog.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(log);
  } catch {
    res.status(500).json({ message: "Failed to add therapy log" });
  }
});

router.get("/", authenticate, async (req, res) => {
  if (!["teacher", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not allowed" });
  }
  const { studentId, type } = req.query;
  const filter = {};
  if (studentId) filter.studentId = studentId;
  if (type) filter.therapyType = type;

  const logs = await TherapyLog.find(filter).populate("studentId");
  res.json(logs);
});

export default router;
