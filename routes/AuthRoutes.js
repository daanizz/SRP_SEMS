import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// ⭐ First admin (one-time, no token)
router.post("/register-admin", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists. Please login." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({ fullName, email, hashPassword, role: "admin" });

    return res.status(201).json({ message: "Admin created successfully", userId: admin._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ⭐ Login (no middleware)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🟦 Login attempt:", email);   // <--- ADD THIS

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed (No user):", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.hashPassword);
    if (!validPassword) {
      console.log(" Login failed (Wrong password):", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(` Login successful → ${user.role.toUpperCase()}: ${email}`);
    
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_SECRET || "access_secret",
      { expiresIn: "1h" }
    );
return res.json({
  message: "Login successful",
  accessToken,
  role: user.role,
  fullName: user.fullName,
});


  } catch (err) {
    console.log(" Login Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ⭐ Create other users
// Policy: admin → can create teacher; teacher → cannot create users here (teachers create STUDENTS via Student collection, not this route)
router.post("/register", authenticate, async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const requesterRole = req.user.role;
    const allowedRoles = { admin: ["teacher"] }; // ← only admin can create teacher
    if (!allowedRoles[requesterRole]?.includes(role)) {
      return res.status(403).json({ message: `You can’t create '${role}'` });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, hashPassword, role });

    return res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;