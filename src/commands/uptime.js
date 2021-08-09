const Command = require('../structures/command.js');
const {MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'uptime',
    description: 'uptime command',

    async run(message, args, client) {
        let totalSeconds = client.uptime / 1000;
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const embed = new MessageEmbed()
            .setColor('#DD8505')
            .setTitle(':stopwatch: Uptime')
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL());
        if (days)
            embed.addField('Days', '' + days, true);
        if (hours)
            embed.addField('Hours', '' + hours, true);
        if (minutes)
            embed.addField('Minutes', '' + minutes, true);
        if (seconds)
            embed.addField('Seconds', '' + seconds, true);

        message.reply({embeds: [embed]});
    }
});