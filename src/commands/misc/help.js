const Command = require('../../structures/command.js');
const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'help',
    description: 'Displays information about each command.',
    aliases: ['info', 'hepl'],
    emoji: '📙',

    async run(message, args, client) {
        const options = Array.from(client.commands.keys())
            .filter(command => !command.hidden)
            .sort((cmd1, cmd2) => { // Sorts commands alphabetically by name
                const textA = cmd1.name.toUpperCase();
                const textB = cmd2.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).map(command => { //Accesses the non-hidden commands and returns the following
                return {
                    label: command.name,
                    description: command.aliases ? command.aliases.join(', ') : null,
                    value: command.name,
                    emoji: command.emoji
                };
            });
        const row = new MessageActionRow().addComponents(new MessageSelectMenu() //Creates a menu that has the following
            .setCustomId(`help ${client.prefix} ${message.author.id}`)
            .setPlaceholder('No command selected')
            .addOptions(options)
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