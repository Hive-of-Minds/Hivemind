const Command = require('../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'snipe',
    description: 'Snipe command',

    async run(message, args, client) {
        const snipes = client.snipes.get(message.channel.id) || [];
        const snipe = snipes[0];
        if (!snipe) return message.channel.send('no message has been deleted')
        const embed = new MessageEmbed()
            .setAuthor(snipe.author.tag)
            .setThumbnail(snipe.author.avatarURL())
            .setColor('RANDOM')
            .setDescription(snipe.content)
            .setTimestamp();
        message.channel.send({embeds: [embed]});
    }
});