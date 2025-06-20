const express = require("express");
const {
  registerUser,
  loginUser,
  resetPassword,
  confirmResetPassword,
} = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/reset").post(resetPassword);
router.route("/reset/:token").post(confirmResetPassword);

module.exports = router;
