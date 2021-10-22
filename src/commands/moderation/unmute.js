const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'unmute',
    description: 'unmutes a person',
    userPermissions: ['MANAGE_ROLES'],
    aliases: ['um'],

    async run(message) {
        let member = message.mentions.members.first(); //Assigns the first member who was mentioned to the variable member
        let role = message.guild.roles.cache.find(role => role.name === "Muted"); //Accesses the role with the name 'Muted' and assigns it to the variable role
        if (member.roles.cache.some(role => role.name === "Muted")){
            await member.roles.remove(role);
            message.channel.send(member.user.username + " has been unmuted!");
        } else {
            message.reply(member.user.username + " doesn't have a muted role.")
        }
    }
});