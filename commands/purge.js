module.exports = {
  match: 'purge(-?messages)',
  async execute(message, [amount]) {
    const err = (error) =>
      message.channel.send(error).then((msg) => msg.delete({ timeout: 5000 }));

    if (!amount || Number.isNaN(amount) || +amount < 2 || +amount > 100)
      return err(
        `:x: Please provide a number between 2 and 100 for the number of messages to delete.\nCorrect usage: \`\`${this.usage}\`\``
      );

    return message.channel
      .bulkDelete(+amount + 1)
      .then(() =>
        message.channel
          .send(`Successfully deleted ${amount} messages`)
          .then((msg) => msg.delete({ timeout: 2000 }))
      )
      .catch(() => err(`:x: I couldn't delete those messages!`));
  },
};
