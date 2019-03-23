const { MessageEmbed, version } = require('discord.js');
const { duration } = require('moment');
require('moment-duration-format');

module.exports = {
  name: 'botstats',
  desc: 'Displays various bot statistics.',
  aliases: ['bs', 'stats', 'i', 'info'],
  guildOnly: false,
  exec(client, message) {
    const embed = new MessageEmbed()
      .setColor('#4cb9fa')
      .addField('❯❯ Uptime', `• ${duration(client.uptime).format('D [d], H [h], m [m], s [s]')}`, true)
      .addField('❯❯ Memory Usage', `• ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} KB`, true)
      .addField('❯❯ General Stats', [
        `• Servers: ${client.guilds.size.toLocaleString('en-US')}`,
        `• Channels: ${client.channels.filter(chan => ['text', 'voice'].includes(chan.type)).size.toLocaleString('en-US')}`,
        `• Users: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString('en-US')}`,
        `• Commands: ${client.commands.size}`,
      ].join('\n'), true)
      .addField('❯❯ Versions', `• [Node](https://nodejs.org): ${process.version}\n• [Discord.js](https://discord.js.org): v${version}`, true)
      .addField('❯❯ Source Code', '• [View Here](https://github.com/syztumGG/predlagam.)', true)
      .addField('❯❯ Hosted With', '• [Heroku](https://heroku.com)', true)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter('© 2019 サム 𝐬𝐲𝐳𝐭𝐮𝐦.');

    message.channel.send(embed);
  },
};
