const Discord = require('discord.js');
const fs = require('fs');
// const path = require('path');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Get all command files ending in .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Get values from config
const {
    prefix,
    token,
    botPresence
} = require('./config.json');

// Event listener for when the bot has started
client.once('ready', () => {
    console.log(`I am now ${botPresence.status}, my name is ${client.user.username}#${client.user.discriminator}`);

    // Sets the bot's status and activity
    client.user.setPresence({
        activity: {name: botPresence.activity},
        status: botPresence.status,
    });
});

// Starts the bot
client.login(token);

// Add all commands to a big list
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Registered command: ${command.name}`);
}

// Finds corresponding command when message sent
client.on('message', message => {

    // if not starting with prefix, sent by bot, or in dms, dont run the command!
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content
        .slice(prefix.length) // removes prefix
        .trim() // removes trailing and leading whitespace
        .split(/ +/); // separates by blank character
    const command = args.shift().toLowerCase(); // gets first arg (command name)

    //  checks if command exists
    if (!client.commands.has(command)) return;
    try {
        // runs command
        client.commands.get(command).execute(message, args);
    } catch (error) {
        // incase of error
        console.error(error);
        message.reply('An internal error occurred.');
    }
});