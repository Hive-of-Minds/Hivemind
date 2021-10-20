const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'reload',
    description: 'Reloads commands and events.',
    ownerOnly: true,
    hidden: true,

    async run(message, args, client) {
        client.reload(); //Restarts the bot
        message.reply('Bot has been reloaded successfully');
    }
});
