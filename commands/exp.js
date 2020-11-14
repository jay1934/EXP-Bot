module.exports = {
  match: 'e?xp(erience)?',
  async execute(message, [id]) {
    let member;
    try {
      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch({ user: id || '123' }));
    } catch (e) {
      member = message.member;
    }
    const data = JSON.parse(require('fs').readFileSync('./data/exp.json'));
    const { [member.id]: exp } = data;
    if (!exp)
      return message.channel.send(
        `${
          member.id === message.author.id
            ? 'You have'
            : `${member.user.username} has`
        } no EXP yet!`
      );

    message.channel.send(
      `${
        member.id === message.author.id
          ? 'You are'
          : `${member.user.username} is`
      } currently **level ${exp.level}**, and **rank ${
        Object.entries(data)
          .sort(([, a], [, b]) => b.exp - a.exp)
          .findIndex(([ID]) => ID === member.id) + 1
      }** on the leaderboard :partying_face:\n${
        member.id === message.author.id
          ? 'You have'
          : `${member.user.username} has`
      } **${exp.exp} EXP** points and need **${
        (exp.level + 1) ** 2 * 100 - exp.exp
      }** more to level up!\n\n**Progress Bar (To Next Level):**\n${require('discord.js-utility').progressbar(
        exp.exp - (exp.level - 1) ** 2 * 100,
        (exp.level + 1) ** 2 * 100,
        12
      )}`
    );
  },
};
