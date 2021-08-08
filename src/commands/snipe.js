const Command = require('../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'snipe',
    description: 'Snipe command',

    async run(message, args, client) {
        const snipes = client.snipes.get(message.channel.id) || [];
        const snipe = snipes[0];
        if (!snipe) return message.reply('no message has been deleted')
        const embed = new MessageEmbed()
            .setAuthor(snipe.author.tag)
            .setThumbnail(snipe.author.avatarURL())
            .setColor('#DD8505')
            .setDescription(snipe.content)
            .setTimestamp()
            .setFooter("Requested by " + message.author.tag);
        message.reply({embeds: [embed]});
    }
});