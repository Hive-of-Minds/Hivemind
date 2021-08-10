const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'riskping',
    description: 'tihihi',

    async run(message, args, client) {

        var owo = Math.round(Math.random() * 1000);

        if (owo == 1000) {
            message.channel.send('@everyone');
        } else {

            message.channel.send('you failed, are you proud of yourself? your a disapointment.')
        }
        message.channel.send(owo.toString());
    }
});
