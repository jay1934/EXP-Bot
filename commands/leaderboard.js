const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  match: '(leaderboard|lb)',
  execute(message) {
    message.channel.send(
      new MessageEmbed()
        .setTitle('Leaderboards')
        .addFields([
          {
            name: 'Experience',
            value: Object.entries(
              JSON.parse(fs.readFileSync('./data/exp.json'))
            )
              .sort(([, a], [, b]) => b.exp - a.exp)
              .map(
                ([id, { exp, level }], idx) =>
                  `**${
                    idx + 1
                  }. <@${id}>**\n**EXP**: ${exp}\n**Level**: ${level}`
              )
              .join('\n'),
          },
          {
            name: 'Cookies',
            value: Object.entries(
              JSON.parse(fs.readFileSync('./data/cookies.json'))
            )
              .sort(([, a], [, b]) => b - a)
              .map(
                ([id, cookies], idx) =>
                  `**${idx + 1}. <@${id}> - ${cookies}** :cookie:`
              ),
          },
        ])
        .setColor('GREEN')
    );
  },
};
