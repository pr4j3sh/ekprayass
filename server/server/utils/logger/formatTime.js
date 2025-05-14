const chalk = require("chalk");

const formatTime = () => {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var day = date.getDate();
  var mon = date.getMonth();
  var year = date.getFullYear();
  time = chalk.whiteBright.bold(
    `[${day}-${mon}-${year} | ${hour}:${min}:${sec}]`
  );
  return time;
};

module.exports = formatTime;
