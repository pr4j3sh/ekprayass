const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { logger } = require("../utils");
const { log, error } = logger;

// @desc    Gets users less data
// @route   GET /api/users
// @access  Public
const getUsersLess = asyncHandler(async (req, res) => {
  try {
    const users = await User.find(
      { role: "marshal" },
      "role avatar firstName lastName"
    );
    res.status(200).json(users);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("User not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Updates user profile
// @route   PUT /api/users/profile/:id/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      firstName,
      lastName,
      email,
      newPassword,
      phone,
      state,
      city,
      country,
      age,
      sex,
      role,
      occupation,
      dob,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }
    if (phone) {
      user.phone = phone;
    }
    if (state) {
      user.state = state;
    }
    if (city) {
      user.city = city;
    }
    if (country) {
      user.country = country;
    }
    if (age) {
      user.age = age;
    }
    if (sex) {
      user.sex = sex;
    }
    if (dob) {
      user.dob = dob;
    }
    if (role) {
      user.role = role;
    }
    if (occupation) {
      user.occupation = occupation;
    }

    if (req.file) {
      user.avatar = req.file.filename;
    }

    const updatedUser = await user.save();
    const { password, ...responseUser } = updatedUser.toObject();

    res.status(200).json(responseUser);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("User not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Deletes user profile
// @route   DELETE /api/users/profile/:id/delete
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await user.deleteOne();

    res.status(204).json({ id: user._id, message: "User deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(500);
      throw new Error("User not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

module.exports = {
  getUsers,
  getUsersLess,
  getUser,
  updateUser,
  deleteUser,
};
