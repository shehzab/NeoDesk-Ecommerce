import express from "express";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const otpStore = {}; // Temporary OTP storage

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP Connection
transporter.verify((error) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails.");
  }
});

// ✅ Request OTP Route
router.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
});

// ✅ Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email] || otpStore[email].otp !== parseInt(otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified successfully" });
});

// ✅ Reset Password Route (Fix for 404 Error)
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!otpStore[email] || otpStore[email].otp !== parseInt(otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  delete otpStore[email]; // Remove OTP after successful reset

  res.json({ message: "Password reset successful" });
});

export default router;
