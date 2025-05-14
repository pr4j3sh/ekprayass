const express = require("express");
const {
  getPoster,
  getPosters,
  createPoster,
  updatePoster,
  deletePoster,
} = require("../controllers/posterController");
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
    cb(null, constants.paths.posterDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getPosters)
  .post(authenticateUser, checkMarshal, upload.single("image"), createPoster);
router
  .route("/:id")
  .get(getPoster)
  .put(authenticateUser, checkMarshal, upload.single("image"), updatePoster)
  .delete(authenticateUser, deletePoster);

module.exports = router;
