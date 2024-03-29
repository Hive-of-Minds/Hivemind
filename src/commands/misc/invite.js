const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'invite',
    description: 'Allows the user to invite the bot to a server',
    emoji: '📬',
    aliases: ['iv'],

    async run(message, args, client) {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2151017536&scope=applications.commands%20bot`;
        message.reply(url);
        message.reply("https://discord.gg/aZhjCFgwVU");
    }
});