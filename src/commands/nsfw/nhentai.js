const Command = require('../../structures/command.js');
const pager = require('discord.js-pagination');
const {MessageEmbed} = require('discord.js');
const nhentai = require('nhentai-js')


module.exports = new Command({
    name: 'nhentai',
    aliases: ['nh'],
    description: "Searches for the give number on nhentai's database.",
    hidden: true,

    async run(message, args, client) {
        
        async () => {
            if(nhentai.exists('147476')) { // checks if doujin exists
                const dojin = await nhentai.getDoujin('147476')
                embedpages = [];
                infoembed = new MessageEmbed()
                .setColor('#DD8505')
                .setTitle(dojin['title'])
                .setURL(dojin['link'])
                .setAuthor('NHenati', "https://media.discordapp.net/attachments/810817634497069059/874883625819197460/n.png")
                .setThumbnail(dojin['details']['pages'][0])
                .setDescription('Select a command to get started!');

                str_build = "#"
                for (let i = 0; i < dojin['details']['tags'].length; i++){
                    str_build.concat(dojin['details']['tags'][i]);
                    if (i !== dojin['details']['tags'].length-1){
                        str_build.concat(", #");
                    }
                }
                infoembed.setDescription(str_build);

                str_build = ""
                for (let i = 0; i < dojin['details']['characters'].length; i++){
                    str_build.concat(dojin['details']['characters'][i]);
                    if (i !== dojin['details']['characters'].length-1){
                        str_build.concat(",");
                    }
                }
                infoembed.addFeild('**Chracters**', str_build);

                str_build = ""
                for (let i = 0; i < dojin['details']['categories'].length; i++){
                    str_build.concat(dojin['details']['categories'][i]);
                    if (i !== dojin['details']['categories'].length-1){
                        str_build.concat(",");
                    }
                }
                infoembed.addFeild('**Categories**', str_build);

                str_build = ""
                for (let i = 0; i < dojin['details']['artists'].length; i++){
                    str_build.concat(dojin['details']['artists'][i]);
                    if (i !== dojin['details']['artists'].length-1){
                        str_build.concat(",");
                    }
                }
                infoembed.setFooter(`*${str_build}*`);

                embedpages.push(infoembed);

                for (let i = 0; i < dojin['details']['pages'].length; i++){
                    pageembed = new MessageEmbed()
                    .setColor('#DD8505')
                    .setTitle(`Page ${i+1}`)
                    .setURL(dojin['details']['pages'][i])
                    .setAuthor('NHenati', "https://media.discordapp.net/attachments/810817634497069059/874883625819197460/n.png")
                    .setThumbnail(dojin['details']['pages'][i])
                    .setImage(dojin['details']['pages'][i]);
                    embedpages.push(pageembed);

                }

                pager(message, embedpages);
            }
            else{
                message.reply(`Doujin ${args[0]} does not exsist.`)
            }}
    }
})