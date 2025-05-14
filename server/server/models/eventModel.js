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

const eventSchema = new mongoose.Schema(
  {
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
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    organization: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["offline", "online", "hybrid"],
    },
    venue: {
      type: String,
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
    author: authorSchema,
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
