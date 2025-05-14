const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const { logger } = require("../utils");
const { log, error } = logger;

// @desc    Gets courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets a course
// @route   GET /api/courses/:id
// @access  public
const getCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

    res.status(200).json(course);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Course not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Creates a course
// @route   POST /api/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
  try {
    const { title, description, details, price, modules, author } = req.body;

    if (!title || !description || !details || !price || !modules) {
      res.status(404);
      throw new Error("Please fill in all the fields");
    }

    if (!author) {
      res.status(404);
      throw new Error("Author not found");
    }

    const course = new Course({
      title,
      description,
      details,
      modules,
      price,
      author,
    });

    if (req.file) {
      course.image = req.file.filename;
    } else {
      res.status(404);
      throw new Error("Please provide an image");
    }

    await course.save();

    return res.status(201).json(course);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates a course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, details, price, modules, status } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

    if (title) {
      course.title = title;
    }
    if (description) {
      course.description = description;
    }
    if (details) {
      course.details = details;
    }
    if (price) {
      course.price = price;
    }
    if (modules) {
      course.modules = modules;
    }
    if (status) {
      course.status = status;
    }

    if (req.file) {
      course.image = req.file.filename;
    }

    const updatedEvent = await course.save();

    res.status(200).json(updatedEvent);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Course not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Deletes a course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

    await course.deleteOne();

    res.status(204).json({ id: course._id, message: "Course deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Course not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
