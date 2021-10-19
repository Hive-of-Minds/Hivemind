const Command = require('../../structures/command');
const fs = require('fs');
const path = require('path');
const {MessageEmbed} = require('discord.js');
const pFile = path.resolve(__dirname, '../alchemy/players.json');
const rFile = path.resolve(__dirname, '../alchemy/recipes.json')

module.exports = new Command({
    name: 'ainventory',
    description: 'alchemy inventory command',

    async run(message) {
        // Read json files
        const pData = JSON.parse(fs.readFileSync(pFile, 'utf-8'));
        const rData = JSON.parse(fs.readFileSync(rFile, 'utf-8'))

        // Return if user doesn't have an account
        if (!pData[message.author.id]) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You need an account to run this command.')
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        // Get every product & result from recipes.json (removes duplicates)
        const totalItemCount = [...new Set([].concat(...Object.values(rData)).concat(...Object.keys(rData).map(key => key.split('+'))))].length;

        // Get player data
        let player = pData[message.author.id];

        // Send inventory embed
        const embed = new MessageEmbed()
            .setTitle(`${player.username}'s inventory (${player.items.length} / ${totalItemCount})`) // Show item count
            .setColor('#DD8505')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(player.items.sort().join(', ') || 'None'); // Display item list

        message.reply({embeds: [embed]});
    }
});