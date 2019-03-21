const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  desc: 'Displays the available commands.',
  aliases: ['h'],
  usage: '[command name]',
  exec(client, message, args) {
    if (!args.length) {
      const listEmbed = new MessageEmbed()
        .setColor('#4cb9fa')
        .addField('Command List', `• Use \`${client.PREFIX}help [command name]\` for more information about a command.`, true)
        .addField('Key', '• **`<>`**: mandatory parameter\n• **`[]`**: optional parameter');

      client.commands.sort((a, b) => a.name.localeCompare(b.name)).forEach((cmd) => {
        if (cmd.name === 'base') return; // exclude base command because it's just a template
        listEmbed.addField(`❯❯ ${cmd.name}`, `• Description: ${cmd.desc}\n${cmd.usage ? `• Usage: \`${client.PREFIX}${cmd.name} ${cmd.usage}\`\n` : ''}`);
      });
      return message.channel.send(listEmbed);
    }
    const cmd = client.commands.get(args[0]) || client.commands.find(command => command.aliases && command.aliases.includes(args[0]));
    if (!cmd || cmd.name === 'base') return message.channel.send(`Sorry, that's not a valid command name. Use \`${client.PREFIX}help\` to view the list of available commands.`);

    const commandEmbed = new MessageEmbed()
      .setColor('#4cb9fa')
      .setTitle(`Command: ${cmd.name}`)
      .addField('❯❯ Description', `• ${cmd.desc}`, true)
      .setThumbnail(client.user.displayAvatarURL());

    if (cmd.usage) commandEmbed.addField('❯❯ Usage', `• ${client.PREFIX}${cmd.name} ${cmd.usage}`, true);
    if (cmd.aliases) commandEmbed.addField('❯❯ Aliases', `• ${cmd.aliases.join(', ')}`, true);
    commandEmbed.addField('❯❯ Guild Only', `• ${cmd.guild ? 'TRUE' : 'FALSE'}`, true);

    return message.channel.send(commandEmbed);
  },
};
