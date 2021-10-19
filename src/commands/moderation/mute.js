const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'mute',
    description: 'mutes a person',
    userPermissions: ['MANAGE_ROLES'],

    async run(message, args, client) {
        let member = message.mentions.members.first(); //Assigns the first member who was mentioned to the variable member
        let role = message.guild.roles.cache.find(role => role.name === "Muted"); //Accesses the role with the name 'Muted' and assigns it to the variable role
        member.roles.add(role);
        message.channel.send('the dirty deed has been done');
    }
});