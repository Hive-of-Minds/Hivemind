const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'reload',
    description: 'Reloads commands and events.',
    emoji: '🔄',
    ownerOnly: true,
    hidden: true,

    async run(message, args, client) {
        client.reload();
        message.reply('Bot has been reloaded successfully');
    }
});
