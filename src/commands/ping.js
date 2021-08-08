const Command = require('../structures/command.js');
//help me im dying lol
module.exports = new Command({
    name: 'ping',
    description: 'Ping command',

    async run(message, args, client) {
        const msg = await message.reply(`:ping_pong: Pong!`);

        msg.edit(`:ping_pong: __Pong!__\nLatency: ${msg.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency: ${client.ws.ping}ms.`);
    }
});