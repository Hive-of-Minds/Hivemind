const Command = require('../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'help',
    description: 'Help command',

    async run(message, args, client) {
        const embed = new MessageEmbed()
            .setColor('#DD8505')
            .setTitle(':gear: Help Menu :gear:')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873744094390788126/help_command_book.png')
            .setTimestamp()
            .setFooter("HiveMind is made by cool people");

        client.commands.each((command, name) => {
            embed.addField(name, command.description, false);
        });

        message.channel.send({embeds: [embed]});
    }
});