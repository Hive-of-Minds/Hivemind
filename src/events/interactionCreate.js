const Event = require('../structures/event.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Event('interactionCreate', (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== 'help-selector') return;

    const command = client.commands.find(cmd => cmd.name === interaction.values[0]);

    const embed = new MessageEmbed()
        .setColor('#DD8505')
        .setTitle(`-- ${interaction.values[0]} --`)
        .setAuthor(interaction.user.username, interaction.user.avatarURL())
        .addField(
            'Usage',
            `\`\`\`\n${client.prefix}${command.name} ${command.arguments ? command.arguments : ''}\n\`\`\``,
            false
        );

    if (command.description) {
        embed.addField('Description', `\`\`\`\n${command.description}\n\`\`\``, false);
    }
    if (command.aliases) {
        embed.addField('Alias(es)', `\`\`\`\n${command.aliases.join(', ')}\n\`\`\``, false);
    }
    // if (command.botPermissions) {
    //     embed.addField('Bot permission(s)', `\`\`\`\n${command.botPermissions.join(', ')}\n\`\`\``, false);
    // }
    // if (command.userPermissions) {
    //     embed.addField('User permission(s)', `\`\`\`\n${command.userPermissions.join(', ')}\n\`\`\``, false);
    // }
    interaction.update({embeds: [embed]});
});