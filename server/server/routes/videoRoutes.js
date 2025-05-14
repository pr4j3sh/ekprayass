const express = require("express");
const {
  getVideo,
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const {
  checkMarshal,
  authenticateUser,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(getVideos)
  .post(authenticateUser, checkMarshal, createVideo);
router
  .route("/:id")
  .get(getVideo)
  .put(authenticateUser, checkMarshal, updateVideo)
  .delete(authenticateUser, deleteVideo);

module.exports = router;
