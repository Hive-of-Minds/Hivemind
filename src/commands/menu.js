const Command = require('../structures/command.js');
const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'help',
    description: 'Help command',

    async run(message, args, client) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(`help ${client.prefix} ${message.author.id}`)
                    .setPlaceholder('Nothing selected')
                    .addOptions(client.commands.map((command, name) => {
                        return {
                            label: name,
                            description: command.aliases ? command.aliases.join(', ') : '[]',
                            value: name,
                        };
                    }))
            );

        const embed = new MessageEmbed()
            .setColor('#DD8505')
            .setTitle(':gear: Help Menu :gear:')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873744094390788126/help_command_book.png')
            .setDescription('Select a command to get started!');

        await message.reply({embeds: [embed], components: [row]});
    }
});