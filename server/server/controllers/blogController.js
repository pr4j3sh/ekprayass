const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const { logger } = require("../utils");
const { log, error } = logger;

// @desc    Gets blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets a blog
// @route   GET /api/blogs/:id
// @access  public
const getBlog = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    res.status(200).json(blog);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Blog not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Creates a blog
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, author } = req.body;
    if (!title || !description) {
      res.status(404);
      throw new Error("Please fill in all the fields");
    }

    if (!author) {
      res.status(404);
      throw new Error("Author not found");
    }

    const blog = new Blog({
      title,
      description,
      author,
    });

    if (req.file) {
      blog.image = req.file.filename;
    } else {
      res.status(404);
      throw new Error("Please provide an image");
    }

    await blog.save();

    return res.status(201).json(blog);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates a blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description, status } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    if (title) {
      blog.title = title;
    }
    if (description) {
      blog.description = description;
    }
    if (status) {
      blog.status = status;
    }

    if (req.file) {
      blog.image = req.file.filename;
    }

    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Blog not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Deletes a blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    await blog.deleteOne();

    res.status(204).json({ id: blog._id, message: "Blog deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Blog not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
