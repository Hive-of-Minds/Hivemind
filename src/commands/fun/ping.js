const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'ping',
    aliases: ['p'],
    description: 'Shows latency.',
    emoji: '🏓',

    async run(message, args, client) {
        message.reply(":ping_pong: __Pong!__").then((message2) => { //Sends a message in the channel where h.meme was inputted and creates another message
            const ping = message2.createdTimestamp - message.createdTimestamp;
            message.channel.send(`Latency: ${ping} \n API Latency: ${client.ws.ping}`); //Sends another message which includes the time difference between the two messages and the latency of the api
        });
    }
})