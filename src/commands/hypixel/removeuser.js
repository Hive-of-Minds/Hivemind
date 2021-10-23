const Command = require('../../structures/command.js');
const {MessageEmbed} = require("discord.js");
const MinecraftAPI = require('minecraft-api');
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, 'joiners.json');

module.exports = new Command({
    name: 'removeuser',
    aliases: ['rus'],
    description: '',
    userPermissions: ['MANAGE_CHANNELS'],

    async run(message, args, client) {
        if (!args.length) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error!')
                .setDescription(`Correct usage: \`${client.prefix}${this.name} ${this.arguments}\``)
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        let joiners = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        if (!joiners[message.channelId]) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error!')
                .setDescription(`This channel has no users to remove.`)
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        const uuid = await MinecraftAPI.uuidForName(args[0]);

        if (!uuid) {
            const embed = new MessageEmbed().setTitle("Error!").setDescription(`\`${args[0]}\` is not a valid username!`);
            return message.reply({embeds: [embed]});
        }

        if (!joiners[message.channelId].includes(uuid)) {
            const embed = new MessageEmbed().setTitle("Error!").setDescription(`\`${args[0]}\` is not added to this channel!`);
            return message.reply({embeds: [embed]});
        }
        joiners[message.channelId] = joiners[message.channelId].filter(u => u !== uuid);

        fs.writeFileSync(dataPath, JSON.stringify(joiners, null, 2));

        const embed = new MessageEmbed().setTitle("Success!").setDescription(`\`${args[0]}\` successfully removed from this channel!`);
        message.reply({embeds: [embed]});
    }
})