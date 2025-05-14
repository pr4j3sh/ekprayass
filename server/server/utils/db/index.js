const mongoose = require("mongoose");
const { logger } = require("../");
const { log, success, error } = logger;
require("dotenv").config();

const devMongoURI = process.env.MONGO_URI_DEV;
const proMongoURI = process.env.MONGO_URI_PRO;

const getMongoURI = (env) => {
  if (env === "development") {
    return devMongoURI;
  } else if (env === "production") {
    return proMongoURI;
  } else {
    error("Invalid enviroment");
    process.exit(1);
  }
};

const connectToDB = async (mongoURI) => {
  try {
    // log(mongoURI);
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    success(`Connected to Databse: ${conn.connection.host}`);
  } catch (err) {
    error(`Error connecting to Database: ${err.message}`);
    process.exit(1);
  }
};

module.exports = {
  getMongoURI,
  connectToDB,
};
