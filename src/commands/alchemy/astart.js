const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
const pFile = path.resolve(__dirname, '../alchemy/players.json');

module.exports = new Command({
    name: 'astart',
    description: 'alchemy start command',
    aliases: ['as'],

    async run(message) {
        // Read data file
        let pData = JSON.parse(fs.readFileSync(pFile, "utf8"));

        // Check if the user already has an account
        if (pData[message.author.id]) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You already have an account.')
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        // Wait for user to enter a username
        message.reply('Please choose a username (60s)');
        const filter = m => m.author.id === message.author.id;
        message.channel
            .awaitMessages({filter, max: 1, time: 60000, errors: ['time']}) // Set 60 second time limit
            .then(response => {

                // Reread data file incase anything has changed in the past 60 seconds
                pData = JSON.parse(fs.readFileSync(pFile, "utf8"));

                // Check that username is not taken
                for (const player in pData)
                    if (pData[player].username === response.first().content) {
                        const errorEmbed = new MessageEmbed()
                            .setTitle('Error')
                            .setDescription(`'${response.first().content}' is taken!`)
                            .setAuthor(message.author.username, message.author.avatarURL());
                        return message.channel.send({embeds: [errorEmbed]});
                    }

                // Create player with default elements
                pData[message.author.id] = {
                    username: response.first().content,
                    items: ['fire', 'water', 'air', 'earth']
                };

                // Update file with new account
                fs.writeFileSync(pFile, JSON.stringify(pData));
                response.first().reply('Account created successfully!');
            })
            .catch(() => {
                const errorEmbed = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('You ran out of time!')
                    .setAuthor(message.author.username, message.author.avatarURL());
                return message.channel.send({embeds: [errorEmbed]});
            });
    }
});