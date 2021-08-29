const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const {MessageSelectMenu, MessageActionRow, MessageEmbed} = require("discord.js");
const pFile = path.resolve(__dirname, '../alchemy/players.json');

module.exports = new Command({
    name: 'acraft',
    description: 'alchemy craft command',
    arguments: '<item 1> <item 2>',

    async run(message, args, client) {
        const pData = JSON.parse(fs.readFileSync(pFile, "utf8"));

        if (!pData[message.author.id]) return message.reply('You need an account to use this command!');

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(`acraft ${client.prefix} ${message.author.id}`)
                    .setPlaceholder('Nothing selected')
                    .setMinValues(2)
                    .setMaxValues(2)
                    .addOptions(pData[message.author.id].items.map(item => ({
                            label: item,
                            value: item
                        }))),
            );

        const embed = new MessageEmbed().setTitle('No item selected');

        message.reply({embeds: [embed, embed], components: [row]});
    }
});