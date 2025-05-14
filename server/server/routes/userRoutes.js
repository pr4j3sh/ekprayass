const express = require("express");
const { authenticateUser } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersLess,
} = require("../controllers/userController");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const constants = require("../../constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, constants.paths.avatarDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.route("/").get(getUsersLess).get(authenticateUser, getUsers);
router.route("/profile/:id").get(authenticateUser, getUser);
router
  .route("/profile/:id/update")
  .put(authenticateUser, upload.single("avatar"), updateUser);
router.route("/profile/:id/delete").delete(authenticateUser, deleteUser);

module.exports = router;
