const fs = require('fs');
module.exports = {
  match: '(yes|no)ping',
  cooldown: 10,
  execute(message) {
    const err = (error) => message.channel.send(`:x: ${error}`).then((msg) => msg.delete({ timeout: 4000 }))
    const pings = JSON.parse(fs.readFileSync('./data/pings.json'));
    const mode = message.content.startsWith('+yes');
    const has = pings.includes(message.author.id);
    if (mode && !has) 
      return err('Your pings are already enabled!')
    else if (!mode && has)
      return err('Your pings are already disabled!')
    message.channel.send(`Your pings have been ${mode ? 'en' : 'dis'}abled`);
    fs.writeFileSync(
      './data/pings.json',
      JSON.stringify(
        mode
          ? pings.filter((id) => id !== message.author.id)
          : [...pings, message.author.id],
        '',
        2
      )
    );
  },
};
