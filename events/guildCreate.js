const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
  const guildCreateEmbed = new MessageEmbed()
    .setColor('#26de81')
    .addField('❯❯ Guild Info', [
      `• Name: ${guild}`,
      `• ID: ${guild.id}`,
      `• Owner: ${await guild.members.fetch(guild.ownerID)}`,
    ].join('\n'))
    .addField('❯❯ Guild Stats', [
      `• Channels: ${guild.channels.filter(chan => ['text', 'voice'].includes(chan.type)).size.toLocaleString('en-US')}`,
      `• Members: ${guild.memberCount.toLocaleString('en-US')}`,
      `• Roles: ${guild.roles.size.toLocaleString('en-US')}`,
      `• Emoji: ${guild.emojis.size.toLocaleString('en-US')}`,
    ].join('\n'))
    .setThumbnail(guild.iconURL())
    .setTimestamp();

  client.channels.get('558904119440572426').send('📥 Joined guild:', { embed: guildCreateEmbed });
};
