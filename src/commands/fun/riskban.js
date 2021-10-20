const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'riskban',
    description: 'A random chance that the mentioned person will be banned or the author will be banned.',
    emoji: '🎲',
    aliases: ['rb'],

    async run(message) {

        const num = Math.round(Math.random() * 10); //Randomly generates an integer between 1 and 10

        //Scenario in which the randomly generated number is less than or equal to 5
        if (num <= 5) {
            await message.guild.members.ban(message.author);
        //Scenario in which the randomly generated number is greater than 5
        } else {
            await message.guild.members.ban(message.mentions.members.first());
        }

        message.channel.send(num.toString());
    }
});
