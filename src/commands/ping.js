const Command = require('../structures/command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Replies with pong',
    aliases: ["pong", "pingpong"],

    async run(message, args, client) {
        const msg = await message.reply(`:ping_pong: Pong!`);
        msg.edit(`:ping_pong: __Pong!__\nLatency: ${msg.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency: ${client.ws.ping}ms.`);
    }
});
