const { logger } = require("../");

require("dotenv").config();
const { warn } = logger;

const getCurrentEnv = () => {
  const environment = process.env.NODE_ENV;
  warn(`Current environment: ${environment}`);
  return environment;
};

module.exports = getCurrentEnv;
