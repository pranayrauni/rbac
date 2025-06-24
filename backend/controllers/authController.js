import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, PasswordResetToken } from "../models/index.js";
import crypto from "crypto";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: "Register failed", details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await PasswordResetToken.create({ userId: user.id, token, expiresAt });

  res.json({
    message: "Reset token generated. Use it to reset password within 30 mins.",
    resetToken: token,
  });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const record = await PasswordResetToken.findOne({ where: { token } });

  if (!record) return res.status(400).json({ message: "Invalid token" });
  if (record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Token expired" });
  }

  const user = await User.findByPk(record.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashed = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashed });

  await record.destroy();
  res.json({ message: "Password reset successful. You can now log in." });
};

export { register, login };
