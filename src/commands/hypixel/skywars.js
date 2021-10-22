const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const MinecraftAPI = require('minecraft-api');

module.exports = new Command({
    name: 'skywars',
    description: 'Shows Hypixel information regarding skywars statistics for a minecraft user.',
    aliases: ['swars', 'sw', 'skyw'],
    arguments: '<username>',

    async run(message, args) {

        try {
            const uuid = await MinecraftAPI.uuidForName(args[0]);
            //console.log(uuid);
            fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=1196621c-8927-4c9f-9a0e-fb69a2d92f82`)
                .then(result => result.json())
                .then(({ player }) => {
                    var skywars_stats = player.stats.SkyWars;
                

            const embed = new MessageEmbed()
                .setTitle(`${args[0]} Skywars Info`)
                .setAuthor(args[0], `https://mc-heads.net/avatar/${args[0]}/100`)
                .setThumbnail("https://media.discordapp.net/attachments/810817634497069059/900990749875777546/skywars.png")
                .setColor('#DD8505')
                .addField('Solo:', "-----", false)
                .addField('Games Played:', ((skywars_stats.wins_solo + skywars_stats.losses_solo)|0).toString(), true)
                .addField('Wins:', (skywars_stats.wins_solo|0).toString(), true)
                .addField('Loses:', (skywars_stats.losses_solo|0).toString(), true)
                .addField('W/L Ratio:', (((skywars_stats.wins_solo/skywars_stats.losses_solo)*1000|0)/1000).toString(), true)
                .addField('Kills:', (skywars_stats.kills_solo|0).toString(), true)
                .addField('Deaths:', (skywars_stats.deaths_solo|0).toString(), true)
                .setImage("https://media.discordapp.net/attachments/810817634497069059/900590242053128222/HypixelLogo.png");
            message.reply({ embeds: [embed] });
        })
        } catch {
            console.log("oops i did a poopy")
        }

        //     function getInfo(username) {

        //             let status = "error"
        //             if(player.isOnline()){
        //                 let status = ":green_circle:Online";
        //             } else{
        //                 let status = ":red_circle:Offline"
        //             }


        //     getInfo(args[0]);
    }
});