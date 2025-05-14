const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

const moduleSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  moduleDescription: {
    type: String,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  modules: [moduleSchema],
  status: {
    type: String,
    enum: ["approved", "pending"],
    default: "pending",
  },
  author: authorSchema,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
