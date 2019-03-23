// require modules
const { Client, Collection } = require('discord.js');
const disabledEvents = require('./storage/disabledEvents');

// instantiate client
const client = new Client({ disabledEvents });

// commands collection
client.commands = new Collection();
// probably not the best idea to have everything carried through the client, but it works so /shrug
client.logger = require('./utils/logger');
require('./storage/config')(client);
require('./utils/utils')(client);

// load commands
client.rr('./commands').forEach((file) => {
  const name = file.split('\\')[file.split('\\').length - 1].split('.')[0];
  client.commands.set(name, require(`./${file}`));
});
// load events
client.readdir('./events').forEach((file) => {
  client.on(file.split('.')[0], require(`./events/${file}`).bind(null, client)); // bind client
});

// login
client.login(require('./storage/token'));

/*                              ____                                */
/*         ____  ________  ____/ / /___ _____ _____ _____ ___       */
/*        / __ \/ ___/ _ \/ __  / / __ `/ __ `/ __ `/ __ `__ \      */
/*       / /_/ / /  /  __/ /_/ / / /_/ / /_/ / /_/ / / / / / /      */
/*      / .___/_/   \___/\__,_/_/\__,_/\__, /\__,_/_/ /_/ /_(_)     */
/*     /_/                            /____/                        */
/*                                                                  */
/*                 Suggest in Slovenian. HalleLuka.                 */
/*                                                                  */
