module.exports = {
  name: 'restart',
  desc: 'Restarts the bot.',
  exec(client, message) {
    if (!client.GODIDS.includes(message.author.id)) return; // check if author is GOD
    process.exit();
  },
};
