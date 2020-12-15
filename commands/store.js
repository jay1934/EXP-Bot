const { MessageEmbed } = require('discord.js');

module.exports = {
  match: 's(hop|tore)',
  execute(message) {
    message.channel.send(
      new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Cookie Store')
        .addFields([
          {
            name: 'Mini Gingy - 50 :cookie:',
            value: '2x cookies for 10 minutes',
          },
          {
            name: 'Colorful Gingy - 100 :cookie:',
            value:
              'Access to the `+nom` command (20 cookies with 10s cooldown)',
          },
          {
            name: 'Rainbow Gingy - 1000 :cookie:',
            value: '4x cookies for 5 minutes',
          },
        ])
    );
  },
};
