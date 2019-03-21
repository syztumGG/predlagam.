const chalk = require('chalk');

module.exports = (client) => {
  const { size } = client.guilds;
  client.logger.log(`${chalk.yellow(client.user.username)} ${chalk.green('online')} in ${size} server${size === 1 ? '' : 's'}.`);
  client.logger.log(`Loaded ${client.commands.size} ${chalk.cyan('commands.')}`);
  client.user.setActivity(`${client.PREFIX}help`, { type: 'PLAYING' });
};
