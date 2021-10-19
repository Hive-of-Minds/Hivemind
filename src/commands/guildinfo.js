const Command = require('../structures/command');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'guildinfo',
    aliases: ['serverinfo'],
    description: 'Guild Info Command',

    async run(message, args, client)  {
        let invite = await message.channel.createInvite(36000, 1);
        let guild = message.guild;
        let image = message.guild.iconURL();

        guild.fetchOwner().then(owner => {
            console.log(owner.user.username + "#" + owner.user.discriminator);
            const embed = new MessageEmbed()
                .setTitle(guild.name)
                .addField("Owner: ",owner.user.username + "#" + owner.user.discriminator, true)
                .setThumbnail(image)
                .addField("Created at ", guild.createdAt.toLocaleString('en-AU'), true)
                .addField("NSFW Level: ", guild.nsfwLevel, true)
                .addField("Invite: ", invite.url, true)
            message.reply({embeds : [embed]});
        })
    }
});