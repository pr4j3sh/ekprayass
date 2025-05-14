const asyncHandler = require("express-async-handler");

// @desc    Gets blogs
// @route   GET /health-check
// @access  Public
const onConnection = asyncHandler(async (_req, res) => {
  res.send({ success: true });
});

module.exports = {
  onConnection,
};
