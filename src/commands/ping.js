module.exports = {
    name: 'ping',
    description: 'Ping command',
    execute(message, args) {
        message.channel.send(`Pong! ${message.client.ws.ping}ms`);
    }
};