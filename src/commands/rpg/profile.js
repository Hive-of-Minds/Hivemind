const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
const dataPath = path.resolve(__dirname, '../rpg/playerdata.json');

module.exports = new Command({
    name: 'profile',
    description: 'profile command',

    async run(message) {
        const points = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        if (!points[message.author.id]) {
            return message.reply('You need to make an account to use this command!');
        }

        let userData = points[message.author.id];

        const embed = new MessageEmbed()
            .setTitle('-- ' + userData.username + ' --')
            .setColor('#DD8505')
            .setAuthor(message.author.username, message.author.avatarURL())
            .addField('Health', `${userData.health} / ${userData.maxHealth}`, true)
            .addField('Balance', `$${userData.balance}`, true)
            .addField('Class', (userData.class ? userData.class : 'None'), true)
            .addField('Guild', (userData.guild ? userData.guild : 'None'), true);

        message.reply({embeds: [embed]});
    }
});