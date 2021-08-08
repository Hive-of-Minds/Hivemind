const Command = require('../structures/command.js');

module.exports = new Command({
    name: 'count',
    description: 'Count command',
    aliases: ['members', 'membercount'],

    async run(message, args, client) {
        message.channel.send(`Total members: ${message.guild.memberCount}`)
    }
});