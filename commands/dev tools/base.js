const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'base',
  desc: 'For easy command cloning... yuh',
  aliases: ['easter', 'egg'],
  args: false,
  usage: 'N/A',
  guildOnly: false,
  perms: false,
  exec(client, message) {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]; // could've used loops but i like the visual representation. values are hardcoded anyway (10 x 10 with 40 bombs)

    // make 40 bombs
    const genInt = () => Math.floor(Math.random() * 10); // function so the ints change every time theyre generated
    for (let counter = 0; counter < 40; counter += 1) {
      let x = genInt(); let y = genInt(); // gen random ints

      while (grid[x][y] === ':bomb:') { // if bomb at position, change ints and check again
        x = genInt();
        y = genInt();
      }
      grid[x][y] = ':bomb:'; // set bomb to new ints

      // increment surrounding squares
      for (let xIndex = x - 1; xIndex <= x + 1; xIndex += 1) { // checks 3 squares (coord - 1 to coord + 1)
        for (let yIndex = y - 1; yIndex <= y + 1; yIndex += 1) { // checks 3 squares (coord - 1 to coord + 1)
          // if all indices are in bounds and the type of value is a number (could've used type coercion but readability), increment the number by 1
          if (xIndex >= 0 && xIndex < 10 && yIndex >= 0 && yIndex <= 10 && !isNaN(grid[xIndex][yIndex])) grid[xIndex][yIndex] += 1;
        }
      }
    }

    // change the numbers into emotes
    const emoteMap = {
      0: ':zero:',
      1: ':one:',
      2: ':two:',
      3: ':three:',
      4: ':four:',
      5: ':five:',
      6: ':six:',
      7: ':seven:',
      8: ':eight:',
    };
    const finalGrid = grid.map(row => row.map(item => `||${emoteMap[item] || item}||`)).join('\n').replace(/,/g, '');

    const msEmbed = new MessageEmbed()
      .setColor('#4cb9fa')
      .setTitle('❯❯ Minesweeper')
      .setDescription([
        '• Grid: 10 x 10',
        '• Bombs: 40',
        finalGrid,
      ].join('\n'));

    message.channel.send('Oh no, you\'ve found me! You get to play minesweeper. (Make sure you have spoilers on)', { embed: msEmbed });
  },
}; // just a command cloning base ( ͡° ͜ʖ ͡°)
