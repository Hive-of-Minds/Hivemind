const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'ban',
    description: 'Ban a member.',
    userPermissions: ['BAN_MEMBERS'],
    async run(message, args, client) {

        message.guild.members.ban(message.mentions.members.first());
    }
});




