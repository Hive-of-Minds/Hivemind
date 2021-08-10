const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'riskban',
    description: 'tihihi',

    async run(message, args, client) {

        var owo = Math.round(Math.random() * 10);

        if (owo<=5) {
            message.guild.members.ban(message.author);
        } else {
            message.guild.members.ban(message.mentions.members.first());
        }

        message.channel.send(owo.toString());
    }
});
