const chalk = require("chalk");
const formatTime = require("./formatTime");

const log = (message) => {
  var time = formatTime();
  var pre = chalk.bgWhiteBright.bold("[LOG]");
  message = chalk.whiteBright(message);
  console.log(`${time} ${pre} ${message}`);
};

const success = (message) => {
  var time = formatTime();
  var pre = chalk.bgGreen.bold("[SUCCESS]");
  message = chalk.green(message);
  console.log(`${time} ${pre} ${message}`);
};

const error = (message) => {
  var time = formatTime();
  var pre = chalk.bgRed.bold("[ERROR]");
  message = chalk.red(message);
  console.log(`${time} ${pre} ${message}`);
};

const warn = (message) => {
  var time = formatTime();
  pre = chalk.bgYellow.bold("[WARN]");
  message = chalk.yellow(message);
  console.log(`${time} ${pre} ${message}`);
};

module.exports = {
  log,
  success,
  error,
  warn,
};
