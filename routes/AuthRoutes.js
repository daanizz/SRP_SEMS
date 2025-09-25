import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register / Create Account
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const requesterRole = req.user.role; // role of logged-in user

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const allowedRoles = {
      admin: ["principal", "teacher", "staff"],
      principal: ["teacher", "student"],
      teacher: ["student"],
    };

    if (!allowedRoles[requesterRole]?.includes(role)) {
      return res
        .status(403)
        .json({
          message: `You are not allowed to create a user with role '${role}'`,
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      hashPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const validPassword = await bcrypt.compare(password, user.hashPassword);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    //Access Token (short life)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_SECRET || "access_secret",
      { expiresIn: "1hr" } // 15 minutes
    );

    //  Refresh Token (long life)
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_SECRET || "refresh_secret",
      { expiresIn: "7d" } // 7 days
    );

    // Refresh Token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
