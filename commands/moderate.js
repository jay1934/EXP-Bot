module.exports = {
  match: 'mod(erate)?',
  async execute(message, [id]) {
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

    if (
      member.roles.highest.position >= message.member.roles.highest.position &&
      message.member.id !== message.guild.ownerID
    )
      return err(
        "You can't moderate someone who's highest role is above or equal to yours"
      );

    if (
      member.roles.highest.position >= message.guild.me.roles.highest.positions
    )
      return err(
        `:x: My highest role is below or equal to ${member.user.username}'s!`
      );

    member
      .setNickname('Moderate User')
      .then(() =>
        message.channel.send(
          `${member.user.username}'s nickname has been changed!`
        )
      )
      .catch(() => err(":x: I can't change this member's nickname!"));
  },
};
