const { MessageEmbed } = require('discord.js');
const DBL = require('dblapi.js');

module.exports = async (client, guild) => {
  const dbl = new DBL(process.env.DBL_TOKEN);
  dbl.postStats(client.guilds.size);

  const guildCreateEmbed = new MessageEmbed()
    .setColor('#26de81')
    .addField('❯❯ Guild Info', [
      `• Name: ${guild}`,
      `• ID: ${guild.id}`,
      `• Owner Name: ${await guild.members.fetch(guild.ownerID).then(member => member.displayName)}`,
      `• Owner ID: ${guild.ownerID}`,
    ].join('\n'))
    .addField('❯❯ Guild Stats', [
      `• Channels: ${guild.channels.filter(chan => ['text', 'voice'].includes(chan.type)).size}`,
      `• Members: ${guild.memberCount.toLocaleString('en-US')}`,
      `• Roles: ${guild.roles.size}`,
    ].join('\n'))
    .setThumbnail(guild.iconURL())
    .setTimestamp();

  client.channels.get('558904119440572426').send('📥 Joined guild:', { embed: guildCreateEmbed });
};
