module.exports = {
  name: 'approve',
  desc: 'Approves a suggestion of your choice.',
  aliases: ['a', 'appr', 'y', 'yes'],
  args: true,
  usage: '<message ID> [reason]',
  guildOnly: true,
  perms: ['ADMINISTRATOR'],
  exec(client, message, args) {
    client.yesNoMaybe(client, message, args, { color: '#26de81', status: '• APPROVED <:agree:463443171901308928>' });
  },
};
