module.exports = {
  name: 'ping',
  desc: 'Pings bot with pretty animation.',
  exec(client, message) {
    message.channel.send(':stopwatch: Ping').then((msg) => {
      const time = msg.createdTimestamp - message.createdTimestamp;
      const playAnimation = list => msg.edit(list.shift()).then(() => setTimeout(() => playAnimation(list), 200));
      playAnimation([
        ':stopwatch: __P__ing',
        ':stopwatch: __Pi__ng',
        ':stopwatch: __Pin__g',
        ':stopwatch: __Ping__',
        `:stopwatch: **PONG** :stopwatch:\nClient: \`${time}ms\`   API: \`${client.ws.ping}ms\``,
      ]);
    });
  },
};
