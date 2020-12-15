const fs = require('fs');

module.exports = {
  match: 'nom',
  cooldown: 10,
  execute(message) {
    if (
      !(
        JSON.parse(require('fs').readFileSync('./data/items.json'))[
          message.author.id
        ] || {}
      )['Colorful Gingy']
    )
      return message.channel
        .send(':x: You need to buy a Colorful Gingy to use this command!')
        .then((msg) => msg.delete({ timeout: 5000 }));
    const cookies = JSON.parse(fs.readFileSync('./data/cookies.json'));
    const items =
      JSON.parse(fs.readFileSync('./data/items.json'))[message.author.id] || {};
    let amount = 10;
    if (items['Mini Gingy'])
      amount *= 2 ** items['Mini Gingy'];
    if (items['Rainbow Gingy'])
      amount *= 4 ** items['Rainbow Gingy'];
    fs.writeFileSync(
      './data/cookies.json',
      JSON.stringify(
        {
          ...cookies,
          [message.author.id]: (cookies[message.author.id] || 0) + amount,
        },
        '',
        2
      )
    );
    message.channel.send(`You ate ${amount} cookies! ${':cookie:'.repeat(amount)}`);
  },
};
