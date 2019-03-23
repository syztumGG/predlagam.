module.exports = (src) => {
  const client = src; // assigning to params is bad >:(
  client.PREFIX = '>>';
  client.GODIDS = ['93198949745201152'];
  client.suggestChannels = {
    vote: 'suggestion-voting',
    log: 'suggestion-logs',
    reg: 'suggestions',
  };
  client.getChannelPerms = (channels, parent, message) => {
    const [vote, log, reg] = channels;
    const channelPerms = [
      {
        name: vote,
        ops: {
          parent,
          permissionOverwrites: [
            {
              id: message.guild.id,
              deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
            },
            {
              id: client.user.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'],
            },
          ],
        },
      }, // only admins (and the bot) can chat, no emoji except check/cross
      {
        name: log,
        ops: {
          parent,
          permissionOverwrites: [
            {
              id: message.guild.id,
              deny: ['VIEW_CHANNEL'],
            },
            {
              id: client.user.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
            },
          ],
        },
      }, // only admins (and bot) can view
      {
        name: reg,
        ops: {
          parent,
          permissionOverwrites: [
            {
              id: client.user.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES'],
            },
          ],
        },
      }, // everyone is allowed
    ];
    return channelPerms;
  };
  return client;
};
