const pager = require('discord.js-pagination');
const {MessageEmbed} = require('discord.js');
const nhentai = require('nhentai-js')
const downloader = require('image-downloader')
const { API, } = require('nhentai-api');
const Command = require('../../structures/command.js');

function getimg(inurl){

    option = {

        url : inurl,
        dest: './nh_temp_pics'

    }

}

module.exports = new Command({
    name: 'nhentai',
    aliases: ['nh'],
    description: "Searches for the given number on nhentai's database.",
    hidden: true,

    async run(message, args, client) {

        const api = new API();
        api.getBook(args[0]).then(book => {
            coverurl = api.getImageURL(book.cover);
        });
        //console.log(book.pages);

        //console.log("here1");
        async function doit() {
            if(nhentai.exists(args[0])) { // checks if doujin exists
                const dojin = await nhentai.getDoujin(args[0])
                embedpages = [];
                infoembed = new MessageEmbed()
                .setColor('#DD8505')
                .setTitle(dojin['title'])
                .setURL(dojin['link'])
                .setAuthor('nhentai', "https://media.discordapp.net/attachments/810817634497069059/874883625819197460/n.png")
                .setThumbnail(coverurl)
                .setDescription('Select a command to get started!');

                if(typeof dojin['details']['tags'] !== "undefined"){
                infoembed.setDescription(dojin['details']['tags'].join(', '));
                }
                if(typeof dojin['details']['artists'] !== "undefined"){
                infoembed.addField('**Artists**', dojin['details']['artists'].join(', '));
                }
                if(typeof dojin['details']['characters'] !== "undefined"){
                infoembed.addField('**Characters**', dojin['details']['characters'].join(', '));
                }
                if(typeof dojin['details']['categories'] !== "undefined"){
                infoembed.addField('**Categories**', dojin['details']['categories'].join(', '));
                }

                embedpages.push(infoembed);
                //console.log(dojin['pages'])
                

                for (let i = 0; i < parseInt(dojin['details']['pages'][0]); i++){
                    pageembed = new MessageEmbed()
                    .setColor('#DD8505')
                    .setTitle(`Page ${i+1}`)
                    .setURL(null) 
                    .setAuthor('nhentai', "https://media.discordapp.net/attachments/810817634497069059/874883625819197460/n.png")
                    .setThumbnail(null)
                    .setImage(dojin['pages'][i]);
                    embedpages.push(pageembed);

                }
                //message.reply({embeds: [embedpages[0]]})
                //console.log(embedpages);

                pager(message, embedpages);
                //console.log("oops");
            }
            else{
                message.reply(`Doujin ${args[0]} does not exsist.`)
            }}
            doit();
            }
})