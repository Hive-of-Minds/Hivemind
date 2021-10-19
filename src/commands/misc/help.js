const Command = require('../../structures/command.js');
const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'help',
    description: 'Displays information about each command.',
    aliases: ['info', 'hepl'],
    emoji: '📙',

    async run(message, args, client) {
        const categories = new Set(new Map([...client.commands.entries()].sort()).values());
        const categoryOptions = [...categories].map(category => {
            return {
                label: category,
                value: category
            }
        })

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu() //Creates a menu that has all the command categories
                .setCustomId(`help_categories ${client.prefix} ${message.author.id}`)
                .setPlaceholder('No category selected')
                .addOptions(categoryOptions));

        const embed = new MessageEmbed()
            .setColor('#DD8505')
            .setTitle(':gear: Help Menu :gear:')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873744094390788126/help_command_book.png')
            .setDescription('Select a category to get started!');

        await message.reply({embeds: [embed], components: [row]});
    }
});

