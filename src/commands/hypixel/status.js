const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const MinecraftAPI = require('minecraft-api');

module.exports = new Command({
    name: 'status',
    description: 'Shows Hypixel information regarding skywars statistics for a minecraft user.',
    aliases: ['hypixelstatus', 'hs', 'hstatus'],
    arguments: '<username>',
    hidden: true,

    async run(message, args) {

        try {
            const uuid = await MinecraftAPI.uuidForName(args[0]);
            //console.log(uuid);
            fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=1196621c-8927-4c9f-9a0e-fb69a2d92f82`)
                .then(result => result.json())
                .then(({ player }) => {
                    var player = player;
            
            if (player.lastLogin > player.lastLogout) {
                var ONLINE = "TRUE 🟢";
            } else {
                var ONLINE = "FALSE 🔴";
            }
            var mseconds = player.lastLogin;
            var d = new Date(0);
            d.setUTCMilliseconds(mseconds);

            const embed = new MessageEmbed()
                .setTitle(`${args[0]} Hypixel Status`)
                .setAuthor(args[0], `https://mc-heads.net/avatar/${args[0]}/100`)
                .setThumbnail("https://media.discordapp.net/attachments/810817634497069059/901261052229066892/DdNypQdN_400x400.png")
                .setColor('#DD8505')
                .addField('Online:', ONLINE, false)
                .addField('Last Login:', (d).toString(), true)
                .addField('Karma:', (player.karma).toString(), true);
            message.reply({ embeds: [embed] });
        })
        } catch {
            console.log("oops i did a poopy")
        }
    }
});