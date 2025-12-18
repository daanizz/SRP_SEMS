// BehaviorRoutes.js
import express from "express";
import BehaviorLog from "../models/BehaviorLogModel.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, async (req, res) => {
  try {
    const log = await BehaviorLog.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "Failed to add log" });
  }
});


router.get("/", authenticate, async (req, res) => {
  if (!["teacher", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not allowed" });
  }
  const { studentId, date } = req.query;
  const filter = {};
  if (studentId) filter.studentId = studentId;
  if (date) filter.date = date;

  const logs = await BehaviorLog.find(filter).populate("studentId");
  res.json(logs);
});

export default router;
