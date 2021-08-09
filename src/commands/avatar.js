const Command = require('../structures/command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'avatar',
    description: 'Avatar command',

    async run(message, args, client) {
        if (message.mentions.users.size !== 1) {
            message.reply(`Correct usage: \`${client.prefix}${this.name} ${this.arguments ? this.arguments : ''}\``);
            return;
        }
        const user = message.mentions.users.first();
        if (user === undefined) {
            const embed = new MessageEmbed()
                .setTitle(message.author.tag)
                .setImage(message.author.displayAvatarURL())
                .setColor('RANDOM')
            message.reply({embeds: [embed]});
        } else {
            const embed = new MessageEmbed()
                .setTitle(user.tag)
                .setImage(user.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter('Requested by ' + message.author.tag);
            message.reply({embeds: [embed]});
        }
    }
});