const { Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = (message, client) => {
  if (message.author.bot || !message.guild) return;
  const args = message.content.slice(1).split(/ +/);
  const name = args.shift();
  const command = client.commands.find((_, match) =>
    new RegExp(`^${match}$`).test(name)
  );

  if (!command) {
    const pings = JSON.parse(fs.readFileSync('./data/pings.json'));
    pings.forEach((id) => {
      const user = message.mentions.users.get(id);
      if (!user) return;
      if (!message.deleted) message.delete();
      const embed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(user.tag, user.displayAvatarURL())
        .setTitle(`${user.tag} was warned!`)
        .addField('Warning:', 'Trying to ping someone who has pings disabled')
        .setFooter(`Automatically warned • ${message.guild.name}`);

      message.channel.send(embed);
      message.guild.channels.cache
        .get(require('../../config.json').logChannelID)
        .send(embed);

      const warns = JSON.parse(fs.readFileSync('./data/warnings.json'));
      warns[message.member.id] = [
        ...(warns[message.member.id] || []),
        {
          exec: message.client.user.id,
          warning: 'Trying to ping someone who has pings disabled',
        },
      ];
      fs.writeFileSync('./data/warnings.json', JSON.stringify(warns, '', 2));
    });
    if (client.cooldowns.get('exp').has(message.author.id)) return;
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
    client.cooldowns.get('exp').add(message.author.id);
    return setTimeout(
      () => client.cooldowns.get('exp').delete(message.author.id),
      60000
    );
  }

  if (!message.content.startsWith('+')) return;

  const permissions = Object.entries(
    require('../../config.json').permissions
  ).find(([name]) => new RegExp(`^${command.match}$`).test(name))?.[1] ?? require('../../config.json').permissions.ping;

  if (
    permissions.length &&
    !permissions.some((id) => message.member.roles.cache.has(id))
  )
    return message.channel.send(`:x: Insufficient permissions!`);

  if (command.cooldown) {
    if (!client.cooldowns.get('commands').has(command.match))
      client.cooldowns.get('commands').set(command.match, new Collection());

    const now = Date.now();
    const timestamps = client.cooldowns.get('commands').get(command.match);
    const cooldown = command.cooldown * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldown;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          `:x: Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing that command.`
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldown);
  }

  try {
    command.execute(message, args);
  } catch (e) {
    message.channel.send(':x: Something went wrong!');
    console.log(e);
  }
};
