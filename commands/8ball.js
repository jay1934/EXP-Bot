const { MessageEmbed } = require('discord.js');

module.exports = {
    match: '(8|eight)ball',
    execute(message, args) {
      if (!args.length)
        return message.channel
          .send(
            '❌ Please ask a full question.\nCorrect usage: ``!8ball enter question here``'
          )
          .then((msg) => msg.delete({ timeout: 4000 }));
      const replies = [
        'Maybe.',
        'Certainly not.',
        'I hope so.',
        'Not in your wildest dreams.',
        'There is a good chance.',
        'Quite likely.',
        'I think so.',
        'I hope not.',
        'I hope so.',
        'Never!',
        'Pfft.',
        'Sorry, bucko.',
        'Hell, yes.',
        'Hell to the no.',
        'The future is bleak.',
        'The future is uncertain.',
        'I would rather not say.',
        'Who cares?',
        'Possibly.',
        'Never, ever, ever.',
        'There is a small chance.',
        'Yes!',
        'lol no.',
        'There is a high probability.',
        'What difference does it makes?',
        'Not my problem.',
        'Ask someone else.',
      ];
  
      const question = args.join(' ');
  
      message.channel.send(
        new MessageEmbed()
          .setTitle('The 8Ball has Spoken')
          .setColor('RANDOM')
          .addField('Question:', question[0].toUpperCase() + (`${question.slice(1)}${question.slice(-1) === '?' ? '' : '?'}`))
          .addField('Answer:', replies[~~(Math.random() * replies.length)])
      );
    },
  };
  