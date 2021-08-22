const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'mute',
    description: 'mutes a person',
    userPermissions: ['MANAGE_ROLES'],
    async run(message, args, client) {
        let member = message.mentions.members.first();
        let role = message.guild.roles.cache.find(role => role.name === "Muted");
        member.roles.add(role);
        message.channel.send('the dirty deed has been done');
    }
});