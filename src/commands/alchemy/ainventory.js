const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
const pFile = path.resolve(__dirname, '../alchemy/players.json');

module.exports = new Command({
    name: 'ainventory',
    description: 'alchemy inventory command',

    async run(message) {
        /*
        TODO: Add total item count to inventory (123/456)
        */
        const pData = JSON.parse(fs.readFileSync(pFile, "utf8"));

        if (!pData[message.author.id]) return message.reply('You need to make an account to use this command!');

        let player = pData[message.author.id];

        const embed = new MessageEmbed()
            .setTitle('-- ' + player.username + ' --')
            .setColor('#DD8505')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(player.items.sort().join(', ') || 'None');

        message.reply({embeds: [embed]});
    }
});