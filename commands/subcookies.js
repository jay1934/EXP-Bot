const fs = require('fs');

module.exports = {
  match: '(remove|sub(tract)?)cookies',
  async execute(message, [id, amount]) {
    const err = (error) =>
      message.channel.send(error).then((msg) => msg.delete({ timeout: 5000 }));

    if (!/^(<@!?\d{17,18}>|\d{17,18})$/.test(id))
      return err(
        ':x: Please provide a valid mention or user ID for the first argument'
      );

    let member;
    try {
      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch({ user: id }));
    } catch (e) {
      return err(
        ':x: You did not provide a valid user ID/mention, or it referenced a user who is not in this guild!'
      );
    }

    if (member.roles.highest.position >= message.member.roles.highest)
      return err(
        ":x: You can't subtract cookies from someone who's highest role is above or equal to yours :cookie:"
      );

    if (Number.isNaN(amount.replace(/,/, '')))
      return err(`\`${amount}\` is not a valid number!`);

    const cookies = JSON.parse(fs.readFileSync('./data/cookies.json'));

    fs.writeFileSync(
      './data/cookies.json',
      JSON.stringify(
        {
          ...cookies,
          [member.id]: (cookies[member.id] || 0) - +amount.replace(/,/, ''),
        },
        '',
        2
      )
    );

    message.channel.send(
      `${amount} cookies have been subtracted from ${member.user.username} :cookie:`
    );
  },
};
