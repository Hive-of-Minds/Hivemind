const Command = require('../../structures/command.js');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = new Command({
    name: 'geekjoke',
    description: 'Returns a random geeky joke.',
    aliases: ['gjoke', 'gj', 'geek'],

    async run(message, args) {

        try {
            fetch(`https://geek-jokes.sameerkumar.website/api?format=json`)
                .then(result => result.json())
                .then(({ joke }) => {
                    message.reply(joke);
                


        })
        } catch {
            console.log("oops i did a poopy")
        }
    }
});