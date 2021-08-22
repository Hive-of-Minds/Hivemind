const Command = require('../../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'snipe',
    description: 'Shows last deleted message.',
    emoji: '🔫',

    async run(message, args, client) {
        const snipes = client.snipes.get(message.channel.id) || []; //Accesses the deleted messages (snipes) of the channel that the command was sent in
        const snipe = snipes[0]; //Accesses the most recent snipe
        if (!snipe) return message.reply('No message has been deleted') //Situation in which there is no snipes
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