const chalk = require('chalk');
const DBL = require('dblapi.js');

module.exports = (client) => {
  const dbl = new DBL(require('../storage/tokens').dblTOKEN);
  const { size } = client.guilds;

  setInterval(() => dbl.postStats(size), 1800000);

  client.logger.log(`${chalk.yellow(client.user.username)} ${chalk.green('online')} in ${size} server${size === 1 ? '' : 's'}.`);
  client.logger.log(`Loaded ${client.commands.size} ${chalk.cyan('commands.')}`);
  client.user.setActivity(`${client.PREFIX}help`, { type: 'PLAYING' });
};
