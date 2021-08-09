const Discord = require('discord.js');
const fs = require('fs');
const intents = new Discord.Intents(32509);
const config = require('../config.json');
const path = require('path');

class Client extends Discord.Client {
    constructor() {
        super({intents});
        this.startTime = performance.now();

        this.commands = new Discord.Collection();
        this.snipes = new Discord.Collection();

        this.token = config.token;
        this.prefix = config.prefix;
        this.owners = config.owners;
        this.activity = config.botPresence.activity;
        this.activityType = config.botPresence.activityType;
        this.status = config.botPresence.status;
    }

    start(token) {
        this.reload()
        this.login(token)
    }

    reload() {
        this.commands.clear();
        this.removeAllListeners();

        fs.readdirSync(path.resolve(__dirname, '../commands'))
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                delete require.cache[require.resolve(`../commands/${file}`)]
                const command = require(`../commands/${file}`);
                this.commands.set(command.name, command);
            });
        fs.readdirSync(path.resolve(__dirname, '../events'))
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                delete require.cache[require.resolve(`../events/${file}`)]
                const event = require(`../events/${file}`);
                this.on(event.event, event.run.bind(null, this));
            })
    }
}

module.exports = Client;