import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const otpStore = {}; // Temporary OTP storage

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Request OTP
export const requestOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("OTP Request Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    if (!otpStore[email] || otpStore[email].otp !== Number(otp) || Date.now() > otpStore[email].expiresAt) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    delete otpStore[email];

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
