const Command = require('../structures/command.js');
const translate = require('translate')
const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'translate',
    description: 'translates the given string to one of the languages specified.',
    aliases: ["tlate"],

    async run(message, args, client) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(`translate ${client.prefix} ${message.author.id}`)
                    .setPlaceholder('Select a language')
                    .addOptions([{
                            label: "German",
                            description: command.aliases ? command.aliases.join(', ') : '',
                            value: "de",
                        },
                        {
                            label: "French",
                            description: command.aliases ? command.aliases.join(', ') : '',
                            value: "fr",
                        },
                        {
                            label: "Korean",
                            description: command.aliases ? command.aliases.join(', ') : '',
                            value: "ko",
                        },
                        {
                            label: "Italian",
                            description: command.aliases ? command.aliases.join(', ') : '',
                            value: "it",
                        },
                        {
                            label: "Chinese",
                            description: command.aliases ? command.aliases.join(', ') : '',
                            value: "zh",
                        }])
            )}
});


        const msg = await message.reply(`:ping_pong: Pong!`);


    }
});