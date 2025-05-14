const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { logger, auth } = require("../utils");
const {
  generateToken,
  generateResetToken,
  sendResetEmail,
  validateResetToken,
} = auth;
const { log, error, success } = logger;

// @desc    register user
// @route   POST /api/auth/register
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(400);
      throw new Error("Registration failed");
    }

    const token = generateToken(user._id);
    if (!token) {
      res.status(500);
      throw new Error("Token generation failed");
    }

    req.session.user = user;
    return res.status(201).json({ id: user._id, token });
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    login user
// @route   POST /api/auth/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      res.status(500);
      throw new Error("Please fill in all the fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id);
    if (!token) {
      res.status(500);
      throw new Error("Token generation failed");
    }

    req.session.user = user;
    res.status(200).json({ id: user._id, token });
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    reset password
// @route   POST /api/auth/reset
// @access  public
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(500);
      throw new Error("Please fill in all the fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const resetToken = generateResetToken();

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    await sendResetEmail(user.email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    confirm reset password
// @route   POST /api/auth/reset/:token
// @access  public
const confirmResetPassword = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if ((!token, !newPassword)) {
      res.status(500);
      throw new Error("Please fill in all the fields");
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired token");
    }

    if (!validateResetToken(token, user)) {
      res.status(400);
      throw new Error("Invalid token");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  confirmResetPassword,
};
