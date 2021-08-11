const Command = require('../../structures/command.js');
const {getVoiceConnection} = require("@discordjs/voice");

module.exports = new Command({
    name: 'stop',
    description: 'Stops music from playing.',
    aliases: ['dc', 'disconnect', 'leave'],

    async run(message) {
        const vc = message.guild.me.voice.channel;
        if (!vc) return message.reply('Not in a vc');

        const connection = getVoiceConnection(vc.guild.id);
        connection.destroy();
        message.reply('Disconnected from vc ' + vc.name);
    }
});