const {Client} = require('discord.js');
const client = new Client();

const {config} = require('dotenv');
config({path: __dirname + "/.env"});

// Event listener for when the bot has started
client.on('ready', () => {
    console.log(`I am now online, my name is ${client.user.username}#${client.user.discriminator}`);

    // Sets the bot's status and activity
    let presence = client.user.setPresence({
        activity: {name: 'made in javascript :vomiting:'},
        status: 'online',
    });
});

client.on('message', message => {

    // Ping command (code will be cleaned up in future)
    if (message.content === 'h.ping') {
        message.channel.send('Pong!');
    }
})

// Starts the bot
let login = client.login(process.env.TOKEN);