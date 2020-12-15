const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  match: 'buy',
  execute(message, args) {
    const err = (error) =>
      message.channel.send(error).then((msg) => msg.delete({ timeout: 5000 }));
    const cookies = JSON.parse(fs.readFileSync('./data/cookies.json'))
    const items = () => JSON.parse(fs.readFileSync('./data/items.json'));
    const existing = items()[message.author.id];
    const prizes = {
      'mini gingy': { price: 50, name: 'Mini Gingy', duration: 600000 },
      'colorful gingy': { price: 100, name: 'Colorful Gingy' },
      'rainbow gingy': { price: 1000, name: 'Rainbow Gingy', duration: 240000 },
    };
    const prize = prizes[args.join(' ').toLowerCase()];
    if (!prize) return err(`:x: \`${prize}\` is not a valid prize! Use the \`+store\` command to see all valid prizes!`);
    if (cookies[message.author.id] < prize.price) return err(`:x: You don\'t have enough money! ${prize.name} costs ${prize.price} :cookie:`)
    if (!prize.duration && existing[prize.name])
      return err(`:x: You already have a ${prize.name}!`)
    fs.writeFileSync('./data/items.json', JSON.stringify({ ...items(), [message.author.id]: { ...existing, [prize.name]: 1 + (existing[prize.name] || 0) } }, '', 2))
    fs.writeFileSync('./data/cookies.json', JSON.stringify({ ...cookies, [message.author.id]: cookies[message.author.id] - prize.price }, '', 2))
    message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL()).setColor('GREEN').setTitle(`You bought \`${prize.name}\``))
    if (prize.duration) setTimeout(() => {
      console.log('m')
      const dec = items()
      dec[message.author.id][prize.name]--;
      fs.writeFileSync('./data/items.json', JSON.stringify(dec, '', 2))
    }, prize.duration)
  }
}
