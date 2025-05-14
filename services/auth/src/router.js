const express = require("express");
const { register, login, sendToken, resetPassword } = require("./controllers");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/send").post(sendToken);
router.route("/reset/:token").post(resetPassword);

module.exports = router;
