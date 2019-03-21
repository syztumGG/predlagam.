const fs = require('fs');
const path = require('path');
const { inspect } = require('util');
const haste = require('easy-hastebin');
const { MessageEmbed } = require('discord.js');

const utils = {
  properCase(str) {
    return str.trim().split(/ +/).map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ');
  }, // changes the first character of each word to uppercase
  readdir(dir) {
    return fs.readdirSync(dir);
  }, // read through a directory
  rr(dir) {
    const files = fs.readdirSync(dir).map((file) => {
      const filename = path.join(dir, file);
      return fs.statSync(filename).isDirectory() ? utils.rr(filename) : filename; // if file is dir, run again
    });
    return files.flat();
  }, // recursively read through directories
  async awaitReply(message, question, time = 120000) {
    await message.channel.send(question);
    const coll = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time }); // rEaD tHe dOcS
    if (!coll.first()) return null; // check if message collected
    return coll.first().content; // return collected message
  }, // await a single reply
  async clean(evaled, flags) {
    if (evaled && evaled.constructor.name === 'Promise') await evaled;
    if (typeof evaled !== 'string') return inspect(evaled, { depth: flags || 1 });
    return evaled;
  }, // clean up promises and dive deeper into structures with flags
  async evalIsReserved(evaled, message, err) {
    const cleaned = await utils.clean(evaled, message.flags[0]).then(c => c.replace(message.client.TOKEN, '{ T O K E N }')); // get rid of my token
    if (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
      return;
    }
    const maxChars = err ? cleaned.length + 15 : cleaned.length + 8; // chars depends on the number of formatting characters required
    if (maxChars > 2000) {
      const res = await utils.awaitReply(message, `**\`\`\`asciidoc
== Output exceeded 2000 characters [ ${maxChars} ] ==
// → Messages split at 2000. This message will split into ${Math.ceil(maxChars / 2000)} messages.
Would you like the message or the file? :: [ m for message || h for hastebin ${err ? '' : '|| c for cancel'} ]
\`\`\`**`);
      switch (res) {
        case 'm': message.channel.send(cleaned, { code: 'js', split: true }); break;
        case 'h': haste(cleaned, '.js').then(r => message.channel.send(r)); break;
        case 'c': message.channel.send('Eval aborted.'); break;
        default: return;
      }
    }
    message.channel.send(cleaned, { code: 'js' });
  }, // the actual eval function. with some neat stuff built in
  async yesNoMaybe(client, message, args, { color, status }) {
    const { suggestChannels: { vote, log, reg } } = client;

    const logs = message.guild.channels.find(c => c.name === log && c.type === 'text');
    const voting = message.guild.channels.find(c => c.name === vote && c.type === 'text');
    const suggestions = message.guild.channels.find(c => c.name === reg && c.type === 'text');

    const reply = await voting.messages.fetch(args[0]);
    if (!reply) {
      message.channel.send('That message could not be found.');
      return;
    }
    const voteGetter = reply.reactions.sort((a, b) => a.emoji.name.localeCompare(b.emoji.name)).map(reaction => `• ${reaction.emoji}: ${reaction.count}`);

    const replyEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle('❯❯ Suggestion from')
      .setDescription(reply.embeds[0].description)
      .addField('❯❯ Status', status, true)
      .addField('❯❯ Acted on by', `• ${message.author}`, true)
      .addField('❯❯ Reason', `• ${args.slice(1).join(' ') || 'No reason given.'}`, true)
      .addField('❯❯ Votes when acted on', voteGetter, true)
      .addField('❯❯ Got another idea?', `• Use \`${client.PREFIX}suggest <idea>\` in ${suggestions} to tell the server!`)
      .setTimestamp();

    await reply.edit(`{ SUGGESTION ${status.split('•')[1].split('<')[0].trim()} }`, { embed: replyEmbed });
    message.delete();

    if (!logs) return;
    const updateLogs = new MessageEmbed()
      .setColor(reply.embeds[0].color)
      .addField('❯❯ Action', `• ${reply.content}`)
      .addField('❯❯ Reason', reply.embeds[0].fields.find(field => field.name === '❯❯ Reason').value)
      .addField('❯❯ Votes when acted on', voteGetter)
      .addField('❯❯ Admin Info', [
        `• Tag: ${message.author}`,
        `• ID: ${message.author.id}`,
        `• Highest Role: ${message.member.roles.sort((a, b) => a.position - b.position).last()}`,
      ].join('\n'))
      .addField('❯❯ Jump to suggestion', `[View Here](${reply.url})`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();

    logs.send('📤 Suggestion action occurred:', { embed: updateLogs });
  }, // used in 3 commands and you already know i'm not typing this out again.
};

module.exports = (src) => {
  const client = src; // assigning to params is bad >:(
  Object.keys(utils).forEach((func) => {
    client[func] = utils[func];
  }); // bind functions to client

  // catching errors with pretty messages
  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });
  process.on('unhandledRejection', (err) => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
}; // yes, i could just write the functions in the export but i prefer this dont @ me(
