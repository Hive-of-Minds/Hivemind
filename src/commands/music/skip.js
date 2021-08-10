const Command = require('../../structures/command.js');
const {getVoiceConnection, createAudioPlayer} = require("@discordjs/voice");

module.exports = new Command({
    name: 'skip',
    description: 'skip command',
    aliases: ['s', 'forceskip', 'fs'],

    async run(message) {
        const vc = message.guild.me.voice.channel;
        if (!vc) return message.reply('Not in a vc');

        const connection = getVoiceConnection(vc.guild.id);
        const player = createAudioPlayer();
        const subscription = connection.subscribe(player);

        subscription.unsubscribe();
        message.reply('Skipped!');
    }
});