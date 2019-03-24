module.exports = {
  name: 'reject',
  desc: 'Rejects a suggestion.',
  aliases: ['r', 'rej', 'n', 'no'],
  args: true,
  usage: '<message ID> [reason]',
  guildOnly: true,
  perms: ['ADMINISTRATOR'],
  exec(client, message, args) {
    client.yesNoMaybe(client, message, args, { color: '#ea3842', status: '• DENIED <:disagree:463443171502718978>' });
  },
};
