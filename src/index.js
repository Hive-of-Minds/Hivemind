const {Client} = require('discord.js');
const client = new Client();
const {prefix, token, bot_presence} = require('./config.json')

// Event listener for when the bot has started
client.on('ready', () => {
    console.log(`I am now online, my name is ${client.user.username}#${client.user.discriminator}`);

    // Sets the bot's status and activity
    client.user.setPresence({
        activity: {name: bot_presence.activity},
        status: bot_presence.status,
    });
});

client.on('message', message => {
    // Exit if message was sent by a bot, not in a server, or doesn't start with the prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length) // Removes the prefix from the message
        .trim() // Removes all whitespace (blank characters) from the start/end
        .split(' '); // Separates message by spaces
    const command = args.shift().toLowerCase(); // gets the first argument (command name) and also removes it from original args

    if (command === 'ping') {
        // Sends original message then edits with time since
        message.channel.send(`Pong!`).then(async (msg) => {
            await msg.edit(`🏓 Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${client.ws.ping}ms`);
        });
    } else if (command === 'count') {
        // Displays number of members in server
        message.channel.send(`Total member count: ${message.guild.memberCount}`);
    } else if (command === 'test'){
        // Return if no args
        if (!args.length) return message.channel.send(`You did not input any arguments, ${message.author}!`);
        // Reply with command info
        message.channel.send(`Prefix: ${prefix}\nCommand name: ${command}\nArguments: ${args}`);
    }
})

// Starts the bot
client.login(token);