const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'exit',
    description: 'Shuts the bot down.',
    emoji: '💀',
    hidden: true,
    ownerOnly: true,

    async run(message) {
        await message.reply('Shutting down...');
        process.exit(0); //Shuts down the bot
    }
});