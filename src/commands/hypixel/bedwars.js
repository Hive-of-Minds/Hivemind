const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const MinecraftAPI = require('minecraft-api');

module.exports = new Command({
    name: 'bedwars',
    description: 'Shows Hypixel information regarding bedwars statistics for a minecraft user.',
    aliases: ['bwars', 'bw', 'bedw'],
    arguments: '<username>',
    hiddne: true,

    async run(message, args) {

        try {
            const uuid = await MinecraftAPI.uuidForName(args[0]);
            console.log(`uuid:${uuid}`);
            fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=1196621c-8927-4c9f-9a0e-fb69a2d92f82`)
                .then(result => {
                    result.json();
                    console.log(result)
                            })
                .then(({ player }) => {
                    var bedwars_stats = player.stats.Bedwars;
                    console.log(player);
                

            const embed = new MessageEmbed()
                .setTitle(`${args[0]} Bedwars Info`)
                .setAuthor(args[0], `https://mc-heads.net/avatar/${args[0]}/100`)
                .setThumbnail("https://media.discordapp.net/attachments/810817634497069059/900990502076309585/Bed.png")
                .setColor('#DD8505')
                .addField('Solo:', "-----", false)
                .addField('Games Played:', (bedwars_stats.eight_one_games_played_bedwars|0).toString(), true)
                .addField('Wins:', ((bedwars_stats.eight_one_games_played_bedwars - bedwars_stats.eight_one_losses_bedwars)|0).toString(), true)
                .addField('Loses:', (bedwars_stats.eight_one_losses_bedwars|0).toString(), true)
                .addField('W/L Ratio:', ((((bedwars_stats.eight_one_games_played_bedwars - bedwars_stats.eight_one_losses_bedwars)/bedwars_stats.eight_one_losses_bedwars)*1000|0)/1000).toString(), true)
                .addField('Beds Broken:', (bedwars_stats.eight_one_beds_broken_bedwars|0).toString(), true)
                .addField('4v4v4v4:', "-----", false)
                .addField('Games Played:', (bedwars_stats.four_four_games_played_bedwars|0).toString(), true)
                .addField('Wins:', ((bedwars_stats.four_four_games_played_bedwars - bedwars_stats.four_four_losses_bedwars)|0).toString(), true)
                .addField('Loses:', (bedwars_stats.four_four_losses_bedwars|0).toString(), true)
                .addField('W/L Ratio:', ((((bedwars_stats.four_four_games_played_bedwars - bedwars_stats.four_four_losses_bedwars)/bedwars_stats.four_four_losses_bedwars)*1000|0)/1000).toString(), true)
                .addField('Beds Broken:', (bedwars_stats.four_four_beds_broken_bedwars|0).toString(), true)
                .setImage("https://media.discordapp.net/attachments/810817634497069059/900590242053128222/HypixelLogo.png");
            message.reply({ embeds: [embed] });
        })
        } catch(error) {
            message.reply("Sorry, somthign went wrong.");
            console.log(error)
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