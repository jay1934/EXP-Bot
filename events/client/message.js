const fs = require('fs');

module.exports = (message, client) => {
  if (message.author.bot || !message.guild) return;
  const args = message.content.slice(1).split(/ +/);
  const name = args.shift();
  const command = client.commands.find((_, match) =>
    new RegExp(`^${match}$`).test(name)
  );

  if (!command) {
    if (client.cooldowns.has(message.author.id)) return;
    const exp = JSON.parse(fs.readFileSync('./data/exp.json'));
    const prev = (exp[message.author.id] || {}).exp || 0;
    const amount =
      ((exp[message.author.id] || {}).exp || 0) + ~~(Math.random() * 30);
    const level = Math.floor(0.1 * Math.sqrt(amount));
    if (level > Math.floor(0.1 * Math.sqrt(prev)))
      message.channel.send(
        `Congratulations <@${message.author.id}>, you're now level **${level}** :tada:`
      );
    fs.writeFileSync(
      './data/exp.json',
      JSON.stringify(
        {
          ...exp,
          [message.author.id]: {
            exp: amount,
            level,
          },
        },
        '',
        2
      )
    );
    client.cooldowns.add(message.author.id);
    return setTimeout(() => client.cooldowns.delete(message.author.id), 60000);
  }

  if (!message.content.startsWith('+')) return;

  const permissions = Object.entries(
    require('../../config.json').permissions
  ).find(([name]) => new RegExp(`^${command.match}$`).test(name))[1];

  if (
    permissions.length &&
    !permissions.some((id) => message.member.roles.cache.has(id))
  )
    return message.channel.send(`:x: Insufficient permissions!`);

  try {
    command.execute(message, args);
  } catch (e) {
    message.channel.send(':x: Something went wrong!');
    console.log(e);
  }
};
