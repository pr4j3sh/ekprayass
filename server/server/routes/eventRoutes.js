const express = require("express");
const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
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
    cb(null, constants.paths.eventDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getEvents)
  .post(authenticateUser, checkMarshal, upload.single("image"), createEvent);
router
  .route("/:id")
  .get(getEvent)
  .put(authenticateUser, checkMarshal, upload.single("image"), updateEvent)
  .delete(authenticateUser, deleteEvent);

module.exports = router;
