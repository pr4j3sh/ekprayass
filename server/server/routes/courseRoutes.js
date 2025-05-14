const express = require("express");
const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const {
  checkMarshal,
  authenticateUser,
} = require("../middlewares/authMiddleware");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const constants = require("../../constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, constants.paths.courseDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getCourses)
  .post(authenticateUser, checkMarshal, upload.single("image"), createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(authenticateUser, checkMarshal, upload.single("image"), updateCourse)
  .delete(authenticateUser, deleteCourse);

module.exports = router;
