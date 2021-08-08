const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'help',
    description: 'Help command',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#F1C40F')
            .setTitle('Help Menu')
            .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873719057533251644/HiveMind_pfp.png')
            .setDescription('These are the current commands: \n • `h.count` \n • `h.help` \n • `h.ping`');
        message.channel.send(embed);
    }
}