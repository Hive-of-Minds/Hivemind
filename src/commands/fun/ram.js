const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'ram',
    description: 'not good enough nathan',

    async run(message, args, client) {
        message.channel.send('https://www.youtube.com/watch?v=na8pHdtfWCs&feature=youtu.be');
    }
});
