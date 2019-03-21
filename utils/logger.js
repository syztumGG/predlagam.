const chalk = require('chalk');
const moment = require('moment');

// for pretty stuff in console
exports.log = (content, type = 'log') => {
  const timestamp = `[ ${chalk.red(moment().format('MM.DD.YYYY'))} // ${chalk.red(moment().format('hh:mm:ssa'))} ] ${chalk.bold.green('→')}`;

  if (type === 'error') return console.log(`${timestamp} ${chalk.bold.red(`[ ${type.toUpperCase().slice(0, -2)} ]`)} ${content}`);
  return console.log(`${timestamp} [ ${chalk.blue(type.toUpperCase())} ] ${content}`);
};
exports.error = (...args) => this.log(...args, 'error'); // pass all the arguments into the log function but with the 'error' tag
