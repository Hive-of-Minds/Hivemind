const Command = require('../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'avatar',
    description: 'Avatar command',
    aliases: ['pfp', 'profilepic', 'profile'],
    arguments: '[user]',

    async run(message, args, client) {
        if (message.mentions.users.size > 1) {
            message.reply(`Correct usage: \`${client.prefix}${this.name} ${this.arguments || ''}\``);
            return;
        }
        const embed = new MessageEmbed();
        const user = message.mentions.users.first();
        if (user === undefined) {
                embed.setTitle(message.author.tag)
                .setImage(message.author.displayAvatarURL())
                .setColor('RANDOM')
            message.reply({embeds: [embed]});
        } else {
            embed.setTitle(user.tag)
                .setImage(user.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter('Requested by ' + message.author.tag);
            message.reply({embeds: [embed]});
        }
    }
});