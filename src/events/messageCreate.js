const Event = require('../structures/event.js');

module.exports = new Event('messageCreate', (client, message) => {
    if (message.content.includes("yay")) {
        message.channel.send("*yat");
    }
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name === args[0]);
    if (!command) return;

    command.run(message, args, client);
});