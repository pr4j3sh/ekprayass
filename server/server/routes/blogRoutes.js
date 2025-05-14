const express = require("express");
const {
  getBlog,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
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
    cb(null, constants.paths.blogDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getBlogs)
  .post(authenticateUser, checkMarshal, upload.single("image"), createBlog);
router
  .route("/:id")
  .get(getBlog)
  .put(authenticateUser, checkMarshal, upload.single("image"), updateBlog)
  .delete(authenticateUser, deleteBlog);

module.exports = router;
