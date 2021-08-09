const Event = require('../structures/event.js');

module.exports = new Event('messageCreate', (client, message) => {
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();

    const command = client.commands.find(command => {
        return command.name === name || (command.aliases && command.aliases.find(alias => alias === name));
    });
    if (!command) return;

    if (command.botPermissions) {
        let clientChannelPermissions = message.channel.permissionsFor(message.guild.me);
        if (!clientChannelPermissions.has(command.botPermissions)) {
            const missingPermissions = command.botPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
            return message.reply(`I am missing permissions: ${missingPermissions}`)
        }
    }

    if (command.userPermissions) {
        let memberChannelPermissions = message.channel.permissionsFor(message.member);
        if (!memberChannelPermissions.has(command.userPermissions)) {
            let missingPermissions = command.userPermissions.filter(perm => memberChannelPermissions.has(perm) === false).join(', ')
            return message.reply(`You are missing permissions: ${missingPermissions}`)
        }
    }

    command.run(message, args, client);
});