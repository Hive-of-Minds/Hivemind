const Command = require('../../structures/command.js');
const {MessageEmbed} = require("discord.js");
const MinecraftAPI = require('minecraft-api');
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, 'joiners.json');

module.exports = new Command({
    name: 'listusers',
    aliases: ['lus'],
    description: '',

    async run(message) {
        let joiners = JSON.parse(fs.readFileSync(dataPath, "utf8"));
        if (!joiners[message.channelId]) joiners[message.channelId] = [];

        const uuids = joiners[message.channelId];

        const players = await Promise.all(
            uuids.map(async uuid => {
                return await MinecraftAPI.nameForUuid(uuid);
            })
        );

        const embed = new MessageEmbed().setTitle(`Players (${players.length})`).setDescription(players.join(', '));
        message.reply({embeds: [embed]});
    }
})