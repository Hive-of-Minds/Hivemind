const Command = require('../../structures/command');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel
} = require('@discordjs/voice');

module.exports = new Command({
    name: 'play',
    description: 'Plays given music in a vc.',
    aliases: ['p'],

    async run(message, args) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply('you need to be in a vc');
        if (!args.length) return message.reply('no song specified');

        const r = await yts(args.join(' '));
        const video = r.videos[0];

        if (video) {
            const connection = joinVoiceChannel({
                channelId: vc.id,
                guildId: vc.guildId,
                adapterCreator: vc.guild.voiceAdapterCreator
            });

            const stream = ytdl(video.url, {filter: 'audioonly'});
            const resource = createAudioResource(stream);
            const player = createAudioPlayer();

            connection.subscribe(player);
            player.play(resource);

            message.reply('Now playing: ' + video.title);
        } else {
            message.reply('Unable to find song.');
        }
    }
});