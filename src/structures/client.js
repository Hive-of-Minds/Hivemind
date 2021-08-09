const Discord = require('discord.js');
const {Collection, Intents} = require("discord.js");
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const getFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}

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

        getFiles(path.resolve(__dirname, '../commands'))
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                delete require.cache[require.resolve(`${file}`)]
                const command = require(`${file}`);
                this.commands.set(command.name, command);
            });
        getFiles(path.resolve(__dirname, '../events'))
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                delete require.cache[require.resolve(`${file}`)]
                const event = require(`${file}`);
                this.on(event.event, event.run.bind(null, this));
            });
    }
}

module.exports = Client;