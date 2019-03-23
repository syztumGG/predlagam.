const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'suggest',
  desc: 'Suggest your idea to the server!',
  args: true,
  usage: '<idea>',
  guildOnly: true,
  async exec(client, message, args) {
    const { suggestChannels: { vote, log, reg } } = client;

    const logs = message.guild.channels.find(c => c.name === log && c.type === 'text');
    const voting = message.guild.channels.find(c => c.name === vote && c.type === 'text');
    const suggestions = message.guild.channels.find(c => c.name === reg && c.type === 'text');

    if (message.channel !== suggestions) return message.channel.send(`Suggestions only work in ${suggestions || '#suggestions'}`);
    if (!voting) return message.channel.send(`Could not find a voting channel. Use \`${client.PREFIX}autoconfig\` for the bot to set itself up.`);
    const suggestion = new MessageEmbed()
      .setTitle('❯❯ Suggestion from')
      .setDescription(`• ${message.author}\n${args.join(' ')}`)
      .addField('❯❯ Status', '• Awaiting action', true)
      .setTimestamp();

    const suggestionMessage = await voting.send(suggestion);
    await suggestionMessage.edit(suggestionMessage.embeds[0].addField('❯❯ Response ID', `• ${suggestionMessage.id}`, true));
    await suggestionMessage.react('463443171901308928');
    await suggestionMessage.react('463443171502718978');
    message.channel.send(`Suggestion posted in ${voting}`);

    if (!logs) return message.channel.send(`Could not find a log channel. Use \`${client.PREFIX}autoconfig\` for the bot to set itself up.`);
    const suggestionLog = new MessageEmbed()
      .setColor('#4cb9fa')
      .addField('❯❯ Author Info', [
        `• Tag: ${message.author}`,
        `• ID: ${message.author.id}`,
        `• Highest Role: ${message.member.roles.sort((a, b) => a.position - b.position).last()}`,
      ].join('\n'))
      .addField('❯❯ Jump to suggestion', `[View Here](${suggestionMessage.url})`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();

    return logs.send('📥 New suggestion received:', { embed: suggestionLog });
  },
};
