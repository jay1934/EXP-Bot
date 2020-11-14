module.exports = {
  match: '(bal(ance)?|cookies)',
  async execute(message, [id]) {
    let member;
    try {
      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch({ user: id || '123' }));
    } catch (e) {
      member = message.member;
    }

    const cookies = JSON.parse(
      require('fs').readFileSync('./data/cookies.json')
    );

    if (!cookies[member.id])
      return message.channel.send(
        `${
          member.id === message.author.id
            ? 'You have'
            : `${member.user.username} has`
        } no cookies yet :cookie:`
      );

    message.channel.send(
      `${
        member.id === message.author.id
          ? 'You have'
          : `${member.user.username} has`
      } ${cookies[member.id]} cookies :cookie: `
    );
  },
};
