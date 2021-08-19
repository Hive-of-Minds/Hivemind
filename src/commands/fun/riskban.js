const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'riskban',
    description: 'A random chance that the mentioned person will be banned or the author will be banned.',
    emoji: '🎲',

    async run(message) {

        const owo = Math.round(Math.random() * 10);

        if (owo<=5) {
            await message.guild.members.ban(message.author);
        } else {
            await message.guild.members.ban(message.mentions.members.first());
        }

        message.channel.send(owo.toString());
    }
});
