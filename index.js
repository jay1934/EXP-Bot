const { Client, Collection } = require('discord.js');

const client = new Client();

client.commands = new Collection();
client.cooldowns = new Set();

require('./handlers/events.js').init(client);
require('./handlers/commands.js').init(client);

client.login(require('./config.json').token);
