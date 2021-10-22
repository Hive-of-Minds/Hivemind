const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'ban',
    description: 'Ban a member.',
    userPermissions: ['BAN_MEMBERS'],
    emoji: '🔨',
    aliases: ['b'],

    async run(message) {

        await message.guild.members.ban(message.mentions.members.first());
    }
});




