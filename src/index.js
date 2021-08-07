const {Client} = require('discord.js');
const client = new Client();
const {prefix, token, bot_presence} = require('./config.json')

// Event listener for when the bot has started
client.on('ready', () => {
    console.log(`I am now online, my name is ${client.user.username}#${client.user.discriminator}`);

    // Sets the bot's status and activity
    let presence = client.user.setPresence({
        activity: {name: bot_presence.activity},
        status: bot_presence.status,
    });
});

client.on('message', message => {
    // Exit if message was sent by a bot, not in a server, or doesn't start with the prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Ping command (code will be cleaned up in future)
    if (message.content === `${prefix}ping`) {
        // Sends original message then edits with ping
        message.channel.send(`Pong!`).then(async (msg) => {
            await msg.edit(`🏓 Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${client.ws.ping}ms`);
        });
    } else if (message.content === `${prefix}count`) {
        // Displays number of members in server
        message.channel.send(`Total member count: ${message.guild.memberCount}`);
    }
})

// Starts the bot
let login = client.login(token);