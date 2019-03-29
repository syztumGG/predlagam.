const chalk = require('chalk');
const DBL = require('dblapi.js')

module.exports = (client) => {
  const dbl = new DBL(process.env.DBL_TOKEN);
  dbl.postStats(client.guilds.size);

  client.logger.log([
    chalk.yellow(client.user.username),
    chalk.green('online'),
    'in',
    client.guilds.size,
    `server${client.guilds.size === 1 ? '' : 's'}.`,
  ].join(' '));
  client.logger.log(`Loaded ${client.commands.size} ${chalk.cyan('commands.')}`);
  client.user.setActivity(`${client.PREFIX}help`, { type: 'PLAYING' });
};
