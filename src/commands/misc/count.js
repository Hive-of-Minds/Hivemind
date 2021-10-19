const Command = require('../../structures/command.js');
module.exports = new Command({
    name: 'count',
    description: 'Returns member count of the server.',
    aliases: ['members', 'membercount'],
    emoji: '🔢',

    async run(message) {
        message.reply(`Total members: ${message.guild.memberCount}`)
    }
});