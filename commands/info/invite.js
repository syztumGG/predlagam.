const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'invite',
  desc: 'Invite links.',
  exec(client, message) {
    client.generateInvite([
      'MANAGE_CHANNELS',
      'MANAGE_MESSAGES',
      'MANAGE_WEBHOOKS',
      'VIEW_CHANNEL',
      'SEND_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'USE_EXTERNAL_EMOJIS',
      'ADD_REACTIONS',
    ]).then((invite) => {
      const inviteEmbed = new MessageEmbed()
        .setColor('#4cb9fa')
        .addField('❯❯ Invites', [
          `• [Bot invite](${invite})`,
          '• [Support server](https://discord.gg/rf3zd3e)',
        ].join('\n'))
        .addField('❯❯ Thank you', `• I really appreciate the support! If you have any problems, questions, or suggestions, don't hesitate to use the \`${client.PREFIX}feedback\` command and let me know.`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('© 2019 サム 𝐬𝐲𝐳𝐭𝐮𝐦.');

      message.channel.send(inviteEmbed);
    });
  },
};
