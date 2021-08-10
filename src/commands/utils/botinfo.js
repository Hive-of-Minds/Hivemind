const Command = require('../../structures/command.js');
const {MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'botinfo',
    description: 'Returns info about HiveMind.',

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle('Hivemind')
            .setThumbnail("https://cdn.discordapp.com/attachments/873564554674716765/873719057533251644/HiveMind_pfp.png")
            .setDescription("Bot made in Javascript by divad-nebnahtan, TardisSyntax, pax, Daaaronaaronax and OManW25")
            .setFooter("Use h.help in order to get a list of all the commands available");
        message.reply({embeds: [embed]});
    }
})