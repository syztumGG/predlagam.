const { Client, Collection } = require('discord.js');

const client = new Client({ disabledEvents: ['TYPING_START'] });

client.commands = new Collection();
client.logger = require('./utils/logger');
require('./storage/config')(client);
require('./utils/utils')(client);
require('dotenv').config();

// load commands
client.rr('./commands').forEach((file) => {
  const name = file.split('/')[file.split('/').length - 1].split('.')[0];
  client.commands.set(name, require(`./${file}`));
});
// load events
client.readdir('./events').forEach((file) => {
  client.on(file.split('.')[0], require(`./events/${file}`).bind(null, client)); // bind client
});

// login
client.login(process.env.TOKEN);

/*                              ____                                */
/*         ____  ________  ____/ / /___ _____ _____ _____ ___       */
/*        / __ \/ ___/ _ \/ __  / / __ `/ __ `/ __ `/ __ `__ \      */
/*       / /_/ / /  /  __/ /_/ / / /_/ / /_/ / /_/ / / / / / /      */
/*      / .___/_/   \___/\__,_/_/\__,_/\__, /\__,_/_/ /_/ /_(_)     */
/*     /_/                            /____/                        */
/*                                                                  */
/*                 Suggest in Slovenian. HalleLuka.                 */
/*                                                                  */
