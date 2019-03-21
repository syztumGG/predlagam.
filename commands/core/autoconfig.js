module.exports = {
  name: 'autoconfig',
  desc: 'Automatically configures the bot in your server. Will create a separate suggestions category with multiple channels and permissions.',
  aliases: ['ac', 'config', 'setup'],
  guildOnly: true,
  async exec(client, message) {
    const { suggestChannels: { vote, log, reg } } = client;

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This command is only available for administrators.');
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I need the `MANAGE_CHANNELS` permission to set myself up.');

    const parent = message.guild.channels.find(c => c.name === 'suggestions' && c.type === 'category') || await message.guild.channels.create('suggestions', { type: 'category' });
    const channels = [
      { name: vote, ops: { parent, permissionOverwrites: [{ id: message.guild.id, deny: ['SEND_MESSAGES', 'ADD_REACTIONS'] }] } }, // only admins can chat, no emoji except check/cross
      { name: log, ops: { parent, permissionOverwrites: [{ id: message.guild.id, deny: ['VIEW_CHANNEL'] }] } }, // only admins can view
      { name: reg, ops: { parent } }, // everyone is allowed
    ];

    const created = ['Process started <a:hype:557743206306021376>'];
    const loading = await message.channel.send(created.join('\n'));
    return channels.forEach(async (chan, i) => {
      const existingChannel = message.guild.channels.find(c => c.name === chan.name && c.type === 'text');
      if (existingChannel) {
        created.push(`Error: You already have a channel named ${existingChannel} in your server.`);
        if (i === 2) {
          created.find(msg => msg.startsWith('Update:'))
            ? created.push('All done! The channels are wrapped in a `suggestions` category for you.')
            : created.push('You already had all the channels.');
        }
        return loading.edit(created.join('\n'));
      }
      const newChan = await message.guild.channels.create(chan.name, chan.ops);
      created.push(`Update: Created ${newChan}`);
      if (i === 2) created.push('All done! The channels are wrapped in a `suggestions` category for you.');
      return loading.edit(created.join('\n'));
    });
  },
};
