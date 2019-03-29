const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'feedback',
  desc: 'Give feedback to the bot developer.',
  aliases: ['fb'],
  args: true,
  usage: '<feedback>',
  async exec(client, message, args) {
    const feedbackEmbed = new MessageEmbed()
      .setColor('#4cb9fa')
      .addField('❯❯ Author Info', [
        `• Name: ${message.author}`,
        `• ID: ${message.author.id}`,
        `• Guild: ${message.guild}`,
      ].join('\n'))
      .addField('❯❯ Feedback', args.join(' '))
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();

    await client.channels.get('559444037334073344').send('📥 Feedback Received:', { embed: feedbackEmbed });
    message.channel.send('Thank you for the feedback! I appreciate your support.');
  },
};
