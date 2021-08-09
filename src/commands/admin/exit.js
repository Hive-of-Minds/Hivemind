const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'exit',
    description: 'exit command',
    hidden: true,
    ownerOnly: true,

    async run(message) {
        await message.reply('Shutting down...');
        process.exit(0);
    }
});