const Command = require('../../structures/command');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'guildinfo',
    aliases: ['gi'],
    emoji: '🏠',
    description: 'Returns basic info about the server.',

    async run(message)  {
        let invite = await message.channel.createInvite(36000, 1); //Creates an invite that will last an hour and can only be used once
        let guild = message.guild; //Sets guild to the guild that the message was sent in
        let image = message.guild.iconURL(); //Accesses the server picture

        guild.fetchOwner().then(owner => { //If Hivemind is able to access the guild's owner, then it does the following
            console.log(owner.user.username + "#" + owner.user.discriminator);
            const embed = new MessageEmbed()
                .setTitle(guild.name)
                .addField("Owner: ",owner.user.username + "#" + owner.user.discriminator, true)
                .setThumbnail(image)
                .addField("Created at ", guild.createdAt.toLocaleString(), true)
                .addField("NSFW Level: ", guild.nsfwLevel, true)
                .addField("Invite: ", invite.url, true)
            message.reply({embeds : [embed]});
        })
    }
});