const { asyncHandler } = require("exhandlers");

const register = asyncHandler(async (req, res) => {
  res.json({
    message: "user registered",
    error: null,
    data: null,
  });
});

const login = asyncHandler(async (req, res) => {
  res.json({
    message: "user logged in",
    error: null,
    data: null,
  });
});

const profile = asyncHandler(async (req, res) => {
  res.json({
    message: "user profile",
    error: null,
    data: null,
  });
});

const sendToken = asyncHandler(async (req, res) => {
  res.json({
    message: "token sent",
    error: null,
    data: null,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  res.json({
    message: "password reset",
    error: null,
    data: null,
  });
});

module.exports = {
  register,
  login,
  profile,
  sendToken,
  resetPassword,
};
