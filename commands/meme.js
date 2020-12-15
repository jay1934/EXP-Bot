const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  match: 'meme',
  cooldown: 5,
  async execute(message) {
    const random = (arr) => arr[~~(Math.random() * arr.length)];
    const data = random(
      (
        await fetch('https://imgur.com/r/dankmemes/hot.json').then((res) =>
          res.json()
        )
      ).data.filter(({ ext }) => ['.gif', '.jpg'].includes(ext))
    );
    message.channel.send(
      new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(data.title)
        .setURL(`https://reddit.com${data.reddit}`)
        .setImage(`https://i.imgur.com/${data.hash}${data.ext}`)
        .setFooter(`👍👎 Score - ${data.score}`)
    );
  },
};
