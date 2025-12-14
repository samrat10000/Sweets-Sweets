// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[LOGIN DEBUG] Attempting login for: ${email}`);

    // Ensure email is lowercase to match seed data
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(`[LOGIN DEBUG] User not found: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(`[LOGIN DEBUG] User found: ${user._id}, Role: ${user.role}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`[LOGIN DEBUG] Password match result: ${isMatch}`);
    
    if (!isMatch) {
      console.log(`[LOGIN DEBUG] Password did not match.`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
