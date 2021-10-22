const Command = require('../../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'avatar',
    description: 'Shows the profile picture of the mentioned user.',
    aliases: ['pfp'],
    arguments: '[user]',
    emoji: '📷',

    async run(message, args, client) {
        //Scenario in which multiple members are mentioned after h.avatar
        if (message.mentions.users.size > 1) {
            message.reply(`Correct usage: \`${client.prefix}${this.name} ${this.arguments || ''}\``);
            return;
        }
        const embed = new MessageEmbed();
        const user = message.mentions.users.first(); //Assigns the mentioned member to the constant user
        //Scenario in which no member was mentioned, meaning that user is assigned an undefined value
        if (user === undefined) {
                embed.setTitle(message.author.tag)
                .setImage(message.author.displayAvatarURL())
                .setColor('RANDOM')
            message.reply({embeds: [embed]});
        //Scenario in which a member was mentioned
        } else {
            embed.setTitle(user.tag)
                .setImage(user.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter('Requested by ' + message.author.tag);
            message.reply({embeds: [embed]});
        }
    }
});