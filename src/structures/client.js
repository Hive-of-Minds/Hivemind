const Discord = require('discord.js');
const fs = require('fs');
const intents = new Discord.Intents(32509);
const config = require('../config.json');
const path = require('path');

class Client extends Discord.Client {
    constructor() {
        super({intents});
        this.commands = new Discord.Collection();

        this.token = config.token;
        this.prefix = config.prefix;
        this.botPresence = config.botPresence;
    }

    start(token) {
        fs.readdirSync(path.resolve(__dirname, '../commands'))
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                const command = require(`../commands/${file}`);
                console.log(`- Command '${command.name}' loaded`);
                this.commands.set(command.name, command);
            });
        fs.readdirSync(path.resolve(__dirname, '../events'))
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                const event = require(`../events/${file}`);
                console.log(`- Event '${event.event}' loaded`);
                this.on(event.event, event.run.bind(null, this));
            })

        this.login(token)
    }
}

module.exports = Client;