const { MessageEmbed } = require("discord.js")

const string = 
`Everything inside \`<>\` is required and everything inside \`[]\` is optional. Don't include that syntax in the actual command. Also note that you might not have the permission to use every command.


\`+8ball <question>\`
Ask the 8ball a question

\`+addcookies <mention> <amount>\`
Add cookies to a user. Also works with \`+subcookies\`

\`+cookies [mention]\`
View a user's cookies

\`+ban <mention> [reason]\`
Ban a user

\`+buy <item>\`
Buy something from the \`+shop\`

\`+chomp\`
Eat 5 cookies

\`+clearallwarnings <mention>\`
Clear all of a user's Warnings

\`+clearwarnings <mention> <index(es)>\`
Clear specific warnings from a user

\`+eat\`
Eat a cookies

\`+exp [mention]\`
View a user's exp

\`+help\`
:thinking:

\`+kick <mention> [reason]\`
Kick a user

\`+leaderboard\`
View the cookie and exp leaderboard

\`+meme\`
View a meme from the hot section in \`r/dankmemes\`

\`+moderate <mention>\` 
Changes a user's nickname to "Moderated User"

\`+nom\`
Eat ten cookies

\`+noping\`
After running this command, users will be warned every time they ping you. Use \`+yesping\` to reverse

\`+purge <amount (2-100)>\`
Bulk delete messages from a channel

\`+store\`
View all items available for purchase

\`+warn <mention> <warning>\`
Warn a user

\`+warnings <mention>\`
See all of a user's warnings`

module.exports = {
  match: 'help(me)?',
  async execute(message) {
    await message.member.send(new MessageEmbed().setTitle('All Commands').setDescription(string).setColor('RANDOM'));
    message.react('👍');
  }
}
