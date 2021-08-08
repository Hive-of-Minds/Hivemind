const Event = require('../structures/event.js');

module.exports = new Event('messageCreate', (client, message) => {
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();

    const command = client.commands.find(command => {
        return command.name === name || (command.aliases && command.aliases.find(alias => alias === name));
    });
    if (!command) return;

    // if (command.botPermissions && !message.guild.me.permissionsIn(message.channel).has(command.botPermissions)) {
    //     message.reply('I am missing the permissions required to run this command!');
    //     return;
    // }
    // if (command.userPermissions && !message.member.permissionsIn(message.channel).has(command.userPermissions)) {
    //     message.reply('You are missing the permissions to run this command!');
    //     return;
    // }

    command.run(message, args, client);
});