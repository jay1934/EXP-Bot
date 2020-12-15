const fs = require('fs');

module.exports = {
  match: 'eat',
  cooldown: 10,
  execute(message) {
    const cookies = JSON.parse(fs.readFileSync('./data/cookies.json'));
    const items =
      JSON.parse(fs.readFileSync('./data/items.json'))[message.author.id] || {};
    let amount = 1;
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
    message.channel.send(`You ate ${amount} cookie${amount > 1 ? 's' : ''}! ${':cookie:'.repeat(amount)}`);
  },
};
