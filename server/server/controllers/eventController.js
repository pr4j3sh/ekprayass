const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const { logger } = require("../utils");
const { log, error } = logger;

// @desc    Gets events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets a event
// @route   GET /api/events/:id
// @access  public
const getEvent = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    res.status(200).json(event);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Event not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Creates a event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      organization,
      mode,
      venue,
      author,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !organization ||
      !mode ||
      !venue
    ) {
      res.status(404);
      throw new Error("Please fill in all the fields");
    }

    if (!author) {
      res.status(404);
      throw new Error("Author not found");
    }

    const event = new Event({
      title,
      description,
      date,
      time,
      organization,
      mode,
      venue,
      author,
    });

    if (req.file) {
      event.image = req.file.filename;
    } else {
      res.status(404);
      throw new Error("Please provide an image");
    }

    await event.save();

    return res.status(201).json(event);
  } catch (err) {
    error(err);
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates a event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.id;
    const {
      title,
      description,
      date,
      time,
      organization,
      mode,
      venue,
      link,
      status,
    } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    if (title) {
      event.title = title;
    }
    if (description) {
      event.description = description;
    }
    if (date) {
      event.date = date;
    }
    if (time) {
      event.time = time;
    }
    if (organization) {
      event.organization = organization;
    }
    if (mode) {
      event.mode = mode;
    }
    if (venue) {
      event.venue = venue;
    }
    if (link) {
      event.link = link;
    }
    if (status) {
      event.status = status;
    }

    if (req.file) {
      event.image = req.file.filename;
    }

    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Event not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

// @desc    Deletes a event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    await event.deleteOne();

    res.status(204).json({ id: event._id, message: "Event deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      error(err);
      res.status(404);
      throw new Error("Event not found");
    } else {
      error(err);
      res.status(500);
      throw new Error(err.message);
    }
  }
});

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
