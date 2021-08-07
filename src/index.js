const {Client} = require('discord.js');
const {config} = require('dotenv');

// Creates new D
const client = new Client({
    disableMentions: 'everyone'
});

// Sets the path to config file .env
config({
    path: __dirname + "/.env"
});

// Event listener for when the bot has started
client.on('ready', () => {
    console.log(`I am now online, my name is ${client.user.username}#${client.user.discriminator}`);

    // Sets the bot's status and activity
    let presence = client.user.setPresence({
        activity: {name: 'made in javascript :vomiting:'},
        status: 'online',
    });
});

// Starts the bot
let login = client.login(process.env.TOKEN);