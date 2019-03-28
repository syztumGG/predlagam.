const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
  const guildDeleteEmbed = new MessageEmbed()
    .setColor('#ea3842')
    .addField('❯❯ Guild Info', [
      `• Name: ${guild}`,
      `• ID: ${guild.id}`,
      `• Owner Name: ${await guild.members.fetch(guild.ownerID).then(member => member.displayName)}`,
      `• Owner ID: ${guild.ownerID}`,
    ].join('\n'))
    .addField('❯❯ Guild Stats', [
      `• Members: ${guild.memberCount.toLocaleString('en-US')}`,
      `• Roles: ${guild.roles.size}`,
    ].join('\n'))
    .setThumbnail(guild.iconURL())
    .setTimestamp();

  client.channels.get('558904119440572426').send('📤 Left guild:', { embed: guildDeleteEmbed });
};
