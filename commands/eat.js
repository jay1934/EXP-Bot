const fs = require('fs');

module.exports = {
  match: 'eat',
  execute(message) {
    message.channel.send(`You ate a cookie! :cookie:`);
    const cookies = JSON.parse(fs.readFileSync('./data/cookies.json'));
    fs.writeFileSync(
      './data/cookies.json',
      JSON.stringify(
        {
          ...cookies,
          [message.author.id]: (cookies[message.author.id] || 0) + 1,
        },
        '',
        2
      )
    );
  },
};
