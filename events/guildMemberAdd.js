const { MessageEmbed } = require('discord.js');

module.exports = async (client, member) => {
  if (member.guild.id !== '558097067738791936') return;
  const newMemberEmbed = new MessageEmbed()
    .setColor('#26de81')
    .addField('❯❯ Member Info', [
      `• Tag: ${member}`,
      `• ID: ${member.id}`,
      `• Highest Role: ${member.roles.sort((a, b) => a.position - b.position).last()}`,
    ].join('\n'))
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  client.channels.get('559504484259069962').send('📥 Member Joined:', { embed: newMemberEmbed });
};
