const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");
const { logger } = require("../utils");
const { log, error } = logger;

// @desc    Gets videos
// @route   GET /api/videos
// @access  Public
const getVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets a video
// @route   GET /api/videos/:id
// @access  public
const getVideo = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404);
      throw new Error("Video not found");
    }

    res.status(200).json(video);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Video not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Creates a video
// @route   POST /api/videos/:id
// @access  Private
const createVideo = asyncHandler(async (req, res) => {
  try {
    const { title, description, url, author } = req.body;
    if (!title || !description || !url) {
      res.status(404);
      throw new Error("Please fill in all the fields");
    }

    if (!author) {
      res.status(404);
      throw new Error("Author not found");
    }

    const video = new Video({
      title,
      description,
      url,
      author,
    });

    await video.save();

    return res.status(201).json(video);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates a video
// @route   PUT /api/videos/:id
// @access  Private
const updateVideo = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.id;
    const { title, description, url, status } = req.body;

    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404);
      throw new Error("Video not found");
    }

    if (title) {
      video.title = title;
    }
    if (description) {
      video.description = description;
    }
    if (url) {
      video.url = url;
    }
    if (status) {
      video.status = status;
    }

    const updatedVideo = await video.save();

    res.status(200).json(updatedVideo);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Video not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Deletes a video
// @route   DELETE /api/videos/:id
// @access  Private
const deleteVideo = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404);
      throw new Error("Video not found");
    }

    await video.deleteOne();

    res.status(204).json({ id: video._id, message: "Video deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Video not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

module.exports = {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
};
