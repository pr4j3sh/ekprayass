const asyncHandler = require("express-async-handler");
const Poster = require("../models/posterModel");
const { logger } = require("../utils");
const { log, error } = logger;

// @desc    Gets posters
// @route   GET /api/posters
// @access  Public
const getPosters = asyncHandler(async (req, res) => {
  try {
    const posters = await Poster.find();
    res.status(200).json(posters);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets a poster
// @route   GET /api/posters/:id
// @access  public
const getPoster = asyncHandler(async (req, res) => {
  try {
    const posterId = req.params.id;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      res.status(404);
      throw new Error("Poster not found");
    }

    res.status(200).json(poster);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Poster not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Creates a poster
// @route   POST /api/posters/
// @access  Private
const createPoster = asyncHandler(async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title) {
      res.status(404);
      throw new Error("Please fill in all the fields");
    }

    if (!author) {
      res.status(404);
      throw new Error("Author not found");
    }

    const poster = new Poster({
      title,
      author,
    });

    if (req.file) {
      poster.image = req.file.filename;
    }

    await poster.save();

    return res.status(201).json(poster);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates a poster
// @route   PUT /api/posters/:id
// @access  Private
const updatePoster = asyncHandler(async (req, res) => {
  try {
    const posterId = req.params.id;
    const { title, status } = req.body;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      res.status(404);
      throw new Error("Poster not found");
    }

    if (title) {
      poster.title = title;
    }
    if (status) {
      poster.status = status;
    }

    if (req.file) {
      poster.image = req.file.filename;
    }

    const updatedPoster = await poster.save();

    res.status(200).json(updatedPoster);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Poster not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Deletes a poster
// @route   DELETE /api/posters/:id
// @access  Private
const deletePoster = asyncHandler(async (req, res) => {
  try {
    const posterId = req.params.id;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      res.status(404);
      throw new Error("Poster not found");
    }

    await poster.deleteOne();

    res.status(204).json({ id: poster._id, message: "Poster deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Poster not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

module.exports = {
  getPosters,
  getPoster,
  createPoster,
  updatePoster,
  deletePoster,
};
