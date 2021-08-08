const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'help',
    description: 'Help command',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#DD8505')
            .setTitle('Help Menu')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873744094390788126/help_command_book.png')
            .setDescription('These are the current commands: \n • `h.count` \n • `h.help` \n • `h.ping`')
            .setTimestamp()
            .setFooter("Hivemind is made by cool people and Pax");
        message.channel.send(embed);
    }
}