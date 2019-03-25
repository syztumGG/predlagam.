const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  desc: 'Displays the available commands.',
  aliases: ['h'],
  usage: '[command name]',
  exec(client, message, args) {
    const blocked = ['base', 'eval', 'restart'];
    const availableCommands = (message.guild
      ? client.commands.filter(cmd => !cmd.perms || message.member.permissionsIn(message.channel).has(cmd.perms))
      : client.commands.filter(cmd => !cmd.perms && !cmd.guildOnly)).filter(cmd => !blocked.includes(cmd.name)); // just remove eval

    if (!args.length) {
      const listEmbed = new MessageEmbed()
        .setColor('#4cb9fa')
        .addField('Command List', `• Use \`${client.PREFIX}help [command name]\` for more information about a command.`, true)
        .addField('Key', '• **`<>`**: mandatory parameter\n• **`[]`**: optional parameter');

      availableCommands.sort((a, b) => a.name.localeCompare(b.name)).forEach((cmd) => {
        if (cmd.name === 'base') return; // exclude base command because it's just a template
        listEmbed.addField(`❯❯ ${cmd.name}`, `• Description: ${cmd.desc}\n${cmd.usage ? `• Usage: \`${client.PREFIX}${cmd.name} ${cmd.usage}\`\n` : ''}`);
      });
      return message.channel.send(listEmbed);
    }
    const cmd = availableCommands.find(command => command.name === args[0] || (command.aliases && command.aliases.includes(args[0])));
    if (!cmd || blocked.includes(cmd.name)) return message.channel.send(`Sorry, that's not a valid command name. Use \`${client.PREFIX}help\` to view the list of available commands.`);

    const commandEmbed = new MessageEmbed()
      .setColor('#4cb9fa')
      .setTitle(`Command: ${cmd.name}`)
      .addField('❯❯ Description', `• ${cmd.desc}`)
      .setThumbnail(client.user.displayAvatarURL());

    if (cmd.usage) commandEmbed.addField('❯❯ Usage', `• ${client.PREFIX}${cmd.name} ${cmd.usage}`);
    if (cmd.aliases) commandEmbed.addField('❯❯ Aliases', `• ${cmd.aliases.join('\n• ')}`);
    if (cmd.perms) commandEmbed.addField('❯❯ Required Permissions', `• ${cmd.perms.join('\n• ')}`);
    commandEmbed.addField('❯❯ Guild Only', `• ${cmd.guild ? 'TRUE' : 'FALSE'}`);

    return message.channel.send(commandEmbed);
  },
};
