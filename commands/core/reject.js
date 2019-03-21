module.exports = {
  name: 'reject',
  desc: 'Rejects a suggestion.',
  aliases: ['r', 'rej', 'n', 'no'],
  args: true,
  usage: '<message ID> [reason]',
  guildOnly: true,
  exec(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    client.yesNoMaybe(client, message, args, { color: '#ea3842', status: '• DENIED <:disagree:463443171502718978>' });
  },
};
