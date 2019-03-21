module.exports = {
  name: 'eval',
  desc: 'Evaluates arbitrary Javascript.',
  aliases: ['e'],
  args: true,
  usage: '<code>',
  exec(client, message, args) {
    if (!client.GODIDS.includes(message.author.id)) return; // check if author is GOD

    try {
      client.evalIsReserved(eval(args.join(' ')), message); // eslint-disable-line no-eval
    } catch (err) {
      client.evalIsReserved(err, message, err);
    }
  },
};
