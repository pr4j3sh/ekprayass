const express = require("express");
const { errorHandler } = require("./server/middlewares/errorMiddleware");
const { logger, db, environment } = require("./server/utils");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { error, success, warn, log } = logger;
const { getMongoURI, connectToDB } = db;
const constants = require("./constants");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME || "127.0.0.1";
const currentEnvironment = environment();
const mongoURI = getMongoURI(currentEnvironment);

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10),
      secure: true,
    },
  })
);

const allowedOrigins = process.env.ALLOWED_HOSTS?.split(", ") || [
  `http://${hostname}:${port}`,
];
const options = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(constants.paths.uploadDir));

app.use("/api/auth", require("./server/routes/authRoutes"));
app.use("/api/users", require("./server/routes/userRoutes"));
app.use("/api/events", require("./server/routes/eventRoutes"));
app.use("/api/courses", require("./server/routes/courseRoutes"));
app.use("/api/blogs", require("./server/routes/blogRoutes"));
app.use("/api/videos", require("./server/routes/videoRoutes"));
app.use("/api/posters", require("./server/routes/posterRoutes"));
app.use("/health-check", require("./server/routes/connectionRoutes"));

app.use(errorHandler);

app.listen(port, hostname, async () => {
  try {
    await connectToDB(mongoURI);
    success(`Server running: http://${hostname}:${port}`);
  } catch (err) {
    error(`Error starting the server: ${err.message}`);
  }
});
