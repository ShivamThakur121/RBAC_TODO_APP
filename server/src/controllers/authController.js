import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const genToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

export const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const existing = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existing)
      return res.status(400).json({ message: "Email or username already used" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashed,
      role: "user",
    });

    const token = genToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, username: user.username, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body; // email or username

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = genToken(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, username: user.username, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};
