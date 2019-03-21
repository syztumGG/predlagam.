module.exports = {
  name: 'notsure',
  desc: 'Puts a suggestion under consideration.',
  aliases: ['ns', 'm', 'maybe'],
  args: true,
  usage: '<message ID> [reason]',
  guildOnly: true,
  exec(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    client.yesNoMaybe(client, message, args, { color: '#f1d734', status: '• UNDER CONSIDERATION' });
  },
};
