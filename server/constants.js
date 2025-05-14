const constants = module.exports;
const path = require("path");

constants.paths = {
  baseDir: __dirname,
  uploadDir: path.join(__dirname, "uploads"),
  posterDir: path.join(__dirname, "uploads", "posters"),
  blogDir: path.join(__dirname, "uploads", "blogs"),
  courseDir: path.join(__dirname, "uploads", "courses"),
  eventDir: path.join(__dirname, "uploads", "events"),
  avatarDir: path.join(__dirname, "uploads", "avatars"),
};
