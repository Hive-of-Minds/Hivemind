const Event = require('../structures/event');
const {MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = new Event({
    event: 'interactionCreate',
    async run(client, interaction) {
        if (interaction.isSelectMenu()) {
            if (interaction.customId === `help_categories ${client.prefix} ${interaction.user.id}`) {
                const commandsList = client.commands.filter((folder) => folder === interaction.values[0]);
                const commandOptions = Array.from(commandsList.keys()).map((command) => {
                    return {
                        label: command.name,
                        description: command.aliases ? command.aliases.join(', ') : null,
                        value: command.name,
                        emoji: command.emoji
                    }
                });

                const categories = new Set(new Map([...client.commands.entries()].sort()).values());
                const categoryOptions = [...categories].map(category => {
                    return {
                        label: category,
                        value: category
                    }
                })

                const categoryRow = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`help_categories ${client.prefix} ${interaction.user.id}`)
                        .setPlaceholder(interaction.values[0])
                        .addOptions(categoryOptions));
                const commandRow = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`help_commands ${client.prefix} ${interaction.user.id}`)
                        .setPlaceholder('No command selected')
                        .addOptions(commandOptions));

                const embed = new MessageEmbed()
                    .setColor('#DD8505')
                    .setTitle(':gear: Help Menu :gear:')
                    .setAuthor(interaction.user.username, interaction.user.avatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873744094390788126/help_command_book.png')
                    .setDescription('Select a category to get started!');

                interaction.update({embeds: [embed], components: [categoryRow, commandRow]});

            } else if (interaction.customId === `help_commands ${client.prefix} ${interaction.user.id}`) {
                const command = Array.from(client.commands.keys()).find(command => command.name === interaction.values[0]);

                const embed = new MessageEmbed()
                    .setColor('#DD8505')
                    .setTitle(`${command.emoji || '--'} ${interaction.values[0]} ${command.emoji || '--'}`)
                    .setAuthor(interaction.user.username, interaction.user.avatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/873564554674716765/873744094390788126/help_command_book.png')
                    .addField(
                        'Usage',
                        `\`\`\`\n${client.prefix}${command.name} ${command.arguments || ''}\n\`\`\``,
                        false
                    );

                if (command.description)
                    embed.addField('Description', `\`\`\`\n${command.description}\n\`\`\``, false);
                if (command.aliases)
                    embed.addField('Alias(es)', `\`\`\`\n${command.aliases.join(', ')}\n\`\`\``, false);
                if (command.botPermissions)
                    embed.addField('Bot permission(s)', `\`\`\`\n${command.botPermissions.join(', ')}\n\`\`\``, false);
                if (command.userPermissions)
                    embed.addField('User permission(s)', `\`\`\`\n${command.userPermissions.join(', ')}\n\`\`\``, false);
                if (command.cooldown) {
                    let cooldown = command.cooldown;
                    const days = Math.floor(cooldown / (3600 * 24));
                    const hours = Math.floor(cooldown % (3600 * 24) / 3600);
                    const minutes = Math.floor(cooldown % 3600 / 60);
                    const seconds = Math.floor(cooldown % 60);

                    const d = days > 0 ? days + (days === 1 ? " day, " : " days, ") : "";
                    const h = hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : "";
                    const m = minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
                    const s = seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : "";

                    embed.addField('Cooldown', `\`\`\`\n${d + h + m + s}\n\`\`\``, false);
                }
                if (command.ownerOnly)
                    embed.addField('Owner Only', `\`\`\`\nTrue\n\`\`\``, false);
                if (command.nsfw)
                    embed.addField('NSFW', `\`\`\`\nTrue\n\`\`\``, false);

                await interaction.update({embeds: [embed]});
            } else if (interaction.customId === `translate ${client.prefix} ${interaction.user.id}`) {

            }
        }
    }
});