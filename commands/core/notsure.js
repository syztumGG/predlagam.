module.exports = {
  name: 'notsure',
  desc: 'Puts a suggestion under consideration.',
  aliases: ['ns', 'm', 'maybe'],
  args: true,
  usage: '<message ID> [reason]',
  guildOnly: true,
  perms: ['ADMINISTRATOR'],
  exec(client, message, args) {
    client.yesNoMaybe(client, message, args, { color: '#f1d734', status: '• UNDER CONSIDERATION' });
  },
};
