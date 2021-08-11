const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'ping',
    aliases: ['pong', 'pingpong'],
    description: 'Shows latency.',
    emoji: '🏓',

    async run(message, args, client) {
        message.reply(":ping_pong: __Pong!__").then((message2) => {
            const ping = message2.createdTimestamp - message.createdTimestamp;
            message.channel.send(`Latency: ${ping} \n API Latency: ${client.ws.ping}`);
        });
    }
})