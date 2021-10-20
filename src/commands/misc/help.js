const Command = require('../../structures/command.js');
const {MessageEmbed} = require('discord.js');

module.exports = new Command({
    name: 'help',
    description: 'Displays information about each command.',
    aliases: ['h'],
    arguments: '[command | category]',
    emoji: '📙',

    async run(message, args, client) {
        const commandKeys = Array.from(client.commands.keys());
        const commandValues = Array.from(client.commands.values());

        const embed = new MessageEmbed()
            .setThumbnail('https://cdn.discordapp.com/attachments/900245711289991178/900245765027409950/help_command_book.png')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('#DD8505')


        if (!args.length) {
            const categories = [...new Set(commandValues)];
            embed.setTitle(`-- ${client.user.username} --`)
                .setDescription(categories.map(category => `\`${category}\``).join('\n') + `\n\nUse \`${client.prefix}${this.name} [category]\` to view the commands in this category.`);
            return message.reply({embeds: [embed]});
        }

        args = args.join(' ');
        const category = commandValues.find(category => category === args);
        const command = commandKeys.find(command => command.name === args || (command.aliases && command.aliases.includes(args)));

        if (category) {
            const commands = Array.from(client.commands.filter((folder, command) => folder === category && !command.hidden).keys());

            embed.setTitle(`-- ${category} --`)
                .setDescription(commands.map(command => `\`${command.name}\``).join('\n') + `\n\nUse \`${client.prefix}${this.name} [command]\` to view a command in this category.`);
        } else if (command && !command.hidden) {
            embed.setColor('#DD8505')
                .setTitle(`${command.emoji || '--'} ${command.name} ${command.emoji || '--'}`)
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

        } else {
            embed.setTitle("Error!").setDescription(`No matches for term: **${args}**`);
        }
        message.reply({embeds: [embed]});
    }
});

