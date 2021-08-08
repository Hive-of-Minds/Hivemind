const Command = require('../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'avatar',
    description: 'Avatar command',

    async run(message, args, client) {
        if (message.mentions.users.size > 1) {
            message.channel.send("too many members mentioned");
            return;
        }
        const user = message.mentions.users.first();
        if (user === undefined) {
            const embed = new MessageEmbed()
                .setTitle(message.author.tag)
                .setImage(message.author.displayAvatarURL())
                .setColor('RANDOM')
            message.channel.send({embeds: [embed]});
        } else {
            const embed = new MessageEmbed()
                .setTitle(user.tag)
                .setImage(user.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter('Requested by ' + message.author.tag);
            message.channel.send({embeds: [embed]});
        }
    }
});