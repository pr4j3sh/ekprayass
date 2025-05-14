const express = require("express");
const router = express.Router();
const { onConnection } = require("../controllers/connectionController");

router.route("/").get(onConnection);

module.exports = router;
