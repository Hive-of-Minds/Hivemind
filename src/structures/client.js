const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const path = require('path');
const {Collection, Intents} = require("discord.js");

class Client extends Discord.Client {
    constructor() {
        super({intents: new Intents(32509)});
        this.startTime = performance.now();

        this.commands = new Collection();
        this.snipes = new Collection();

        this.token = config.token;
        this.prefix = config.prefix;
        this.owners = config.owners;
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