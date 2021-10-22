const Command = require('../../structures/command.js');
// const translate = require('translate')
const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'translate',
    description: 'Translates the given string to one of the languages specified.',
    aliases: ["tr"],
    emoji: `🌐`,
    hidden: true,
    ownerOnly: true,

    async run(message, args, client) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(`translate ${client.prefix} ${message.author.id}`)
                    .setPlaceholder('Select a language')
                    .addOptions([{
                            label: "German",
                            description: null,
                            value: "de",
                        },
                        {
                            label: "French",
                            description: null,
                            value: "fr",
                        },
                        {
                            label: "Korean",
                            description: null,
                            value: "ko",
                        },
                        {
                            label: "Italian",
                            description: null,
                            value: "it",
                        },
                        {
                            label: "Chinese",
                            description: null,
                            value: "zh",
                        }]))



        const embed = new MessageEmbed()
        .setColor('#DD8505')
        .setTitle('Translator')
        .setAuthor(message.author.username, message.author.avatarURL())
        .setThumbnail('https://media.discordapp.net/attachments/810817634497069059/874184232849788968/translator.png')
        .setDescription('Select a language to translate from.');

        await message.reply({embeds: [embed], components: [row]});


    }
});