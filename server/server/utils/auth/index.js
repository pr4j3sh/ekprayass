const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { logger } = require("../index");
const { log, success, error } = logger;
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const generateResetToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
};

const sendResetEmail = async (email, resetToken) => {
  const mailOptions = {
    from: {
      name: process.env.FROM_NAME,
      email: process.env.FROM_EMAIL,
    },
    to: email,
    subject: "Password Reset Request",
    html:
      "<p>Hey there,</p><p>You requested to change your password.</p><p>Token:" +
      resetToken +
      " </p><p>Use this token to reset your password.<p/><p>Regards,</p><p>Ek Prayass</p><p>Jagrookta Ki Orr</p>",
  };

  try {
    await transporter.sendMail(mailOptions);
    success("Password reset email sent successfully.");
  } catch (err) {
    error("Error sending password reset email:", err);
    throw new Error("Email could not be sent");
  }
};

const validateResetToken = (token, user) => {
  return (
    token === user.resetPasswordToken && user.resetPasswordExpires > Date.now()
  );
};

module.exports = {
  generateToken,
  generateResetToken,
  sendResetEmail,
  validateResetToken,
};
