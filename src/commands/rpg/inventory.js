const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
const dataPath = path.resolve(__dirname, '../rpg/playerdata.json');
const itemPath = path.resolve(__dirname, '../rpg/items.json');

module.exports = new Command({
    name: 'inventory',
    description: 'inventory command',

    async run(message) {
        const points = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        if (!points[message.author.id]) {
            return message.reply('You need to make an account to use this command!');
        }

        const items = JSON.parse(fs.readFileSync(itemPath, "utf8"));

        let userData = points[message.author.id];

        const embed = new MessageEmbed()
            .setTitle('-- ' + userData.username + ' --')
            .setColor('#DD8505')
            .setAuthor(message.author.username, message.author.avatarURL());
        userData.inventory.filter(item => item).forEach(item => embed.addField(item.name, items[item.type], true));

        message.reply({embeds: [embed]});
    }
});