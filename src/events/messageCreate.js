const Event = require('../structures/event.js');
const {Collection} = require('discord.js');

const cooldowns = new Map();

module.exports = new Event('messageCreate', (client, message) => {
    if (!message.content.startsWith(client.prefix)) return;

    //  prefix  name    args[0]     args[1]     args[2]
    //    h.    help     dog         cat         fish
    const args = message.content.substring(client.prefix.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();

    const command = client.commands.find(command => {
        return command.name === name || (command.aliases && command.aliases.find(alias => alias === name));
    });
    if (command) {
        if (command.ownerOnly && !client.owners.includes(message.author.id)) {
            return message.reply(`Only owners can use ${command.name}`);
        }
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
        if (command.cooldown) {
            if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
            const currentTime = Date.now();
            const timeStamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown) * 1000;

            if (timeStamps.has(message.author.id)) {
                const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;
                if (currentTime < expirationTime) {
                    const timeLeft = (expirationTime - currentTime) / 1000;
                    return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before using ${command.name} again.`);
                }
            }
            timeStamps.set(message.author.id, currentTime);
            setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);
        }

        // Run command
        command.run(message, args, client);
    }
});