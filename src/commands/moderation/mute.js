const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'mute',
    description: 'mutes a person',
    userPermissions: ['MANAGE_ROLES'],
    aliases: ['m'],

    async run(message) {
        let member = message.mentions.members.first(); //Assigns the first member who was mentioned to the variable member
        let role = message.guild.roles.cache.find(role => role.name === "Muted"); //Accesses the role with the name 'Muted' and assigns it to the variable role
        await member.roles.add(role);
        message.channel.send('the dirty deed has been done');
    }
});