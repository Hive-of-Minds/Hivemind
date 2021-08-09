const Command = require('../structures/command.js');

module.exports = new Command({
    name: 'reload',
    description: 'reload command',
    ownerOnly: true,

    async run(message, args, client) {
        client.reload();
        message.reply('Bot has been reloaded successfully');
    }
});
