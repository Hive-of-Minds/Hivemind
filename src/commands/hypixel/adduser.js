const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, 'joiners.json');
const MinecraftAPI = require('minecraft-api');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'adduser',
    aliases: ['aus'],
    description: '',
    userPermissions: ['MANAGE_CHANNELS'],

    async run(message, args) {
        const uuid = await MinecraftAPI.uuidForName(args[0]);

        let joiners = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        if (!joiners[message.channelId]) joiners[message.channelId] = [];

        if (joiners[message.channelId].includes(uuid)) {
            const embed = new MessageEmbed().setTitle("Error!").setDescription(`\`${args[0]}\` has already been added to this channel!`);
            return message.reply({embeds: [embed]});
        }

        joiners[message.channelId].push(uuid);

        fs.writeFileSync(dataPath, JSON.stringify(joiners, null, 2));

        const embed = new MessageEmbed().setTitle("Success!").setDescription(`\`${args[0]}\` successfully added to this channel!`);
        message.reply({embeds: [embed]});
    }
})