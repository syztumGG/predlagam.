module.exports = (client, message) => {
  if (message.author.bot) return;

  const prefixes = [`<@!?${client.user.id}>`, client.PREFIX]; // multiple prefixes (including mention)
  const matchedPrefix = message.content.match(new RegExp(`^(${prefixes.join('|')})`)); // match a prefix

  if (!matchedPrefix) return;

  const args = message.content.slice(matchedPrefix[0].length).trim().split(/ +/g); // split messages by spaces
  const commandName = args.shift().toLowerCase(); // pull the command name out of the args array
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // get command from Collection

  if (!command) return; // don't want this running without commands of course
  if (command.guildOnly && message.channel.type !== 'text') { // don't want this running server commands in DMs
    message.channel.send('Sorry, but this command only works in servers.');
    return;
  }
  if (command.perms && !message.member.permissionsIn(message.channel).has(command.perms)) { // don't want users with improper perms to use commands
    message.channel.send(`You don't have enough permissions to use this command. Required permissions: \`${command.perms.join(', ')}\``);
    return;
  }
  if (command.args && !args.length) { // don't want this running without the proper arguments
    message.channel.send(`You forgot arguments. Proper usage: \`${client.PREFIX}${command.name} ${command.usage}\``);
    return;
  }

  // eslint-disable-next-line no-param-reassign
  message.flags = []; // assigning to params is bad >:(
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1)); // push the flagged bit into the flags array and remove it from the args array
  }

  command.exec(client, message, args); // e x e c .
};
