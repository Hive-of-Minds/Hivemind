const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const {MessageAttachment, MessageEmbed} = require("discord.js");
const pFile = path.resolve(__dirname, '../alchemy/players.json');
const rFile = path.resolve(__dirname, '../alchemy/recipes.json')

module.exports = new Command({
    name: 'acraft',
    description: 'alchemy craft command',
    arguments: '<item>, <item>',

    async run(message, args, client) {

        const rData = JSON.parse(fs.readFileSync(rFile, "utf-8"))
        let pData = JSON.parse(fs.readFileSync(pFile, "utf-8"))

        if (!pData[message.author.id]) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You need an account to run this command.')
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        args = args.join(' ').split(',');

        if (args.length < 2) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Correct usage: \`${client.prefix}${this.name} ${this.arguments}\``)
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        const first = args[0].trim();
        const second = args[1].trim();

        let results = rData[first + '+' + second] || rData[second + '+' + first];

        if (!results) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('Invalid recipe.')
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        if (!(hasItem(pData[message.author.id], first) && hasItem(pData[message.author.id], second))) {
            console.log(first + ', ' + second)
            const missingItems = [first, second].filter(item => !hasItem(pData[message.author.id], item));

            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You are missing items: ' + missingItems.join(', '))
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        if (!Array.isArray(results)) results = [results];

        const firstFile = new MessageAttachment(path.resolve(__dirname, '../../../assets/bigalchemy/' + first + '.png'));
        const firstEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage('attachment://' + first + '.png')

        const secondFile = new MessageAttachment(path.resolve(__dirname, '../../../assets/bigalchemy/' + second + '.png'));
        const secondEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage('attachment://' + second + '.png')

        if (!results.every(result => hasItem(pData[message.author.id], result))) {
            message.channel.send({
                embeds: [firstEmbed, secondEmbed],
                files: [firstFile, secondFile],
                attachments: []
            }).then(msg => setTimeout(() => {
                msg.edit({
                    embeds: [secondEmbed, firstEmbed],
                    files: [firstFile, secondFile],
                    attachments: []
                }).then(() => setTimeout(() => {
                    msg.edit({
                        embeds: [firstEmbed, secondEmbed],
                        files: [firstFile, secondFile],
                        attachments: []
                    }).then(() => setTimeout(() => {
                        sendResult(msg, results, client, message.author);
                        saveData(message, pData, results);
                    }, 1500));
                }, 1500));
            }, 1500));
        } else {
            sendResult(message, results, client, message.author);
            saveData(message, pData, results);
        }


    }
});

function saveData(message, pData, results) {
    pData = JSON.parse(fs.readFileSync(pFile, "utf8"));
    results.filter(result => !hasItem(pData[message.author.id], result)).forEach(result => pData[message.author.id].items.push(result));

    if (pData[message.author.id].items.length >= 100 && !hasItem(pData[message.author.id], 'time')) {
        const timeFile = new MessageAttachment(path.resolve(__dirname, '../../../assets/bigalchemy/time.png'));
        const timeEmbed = new MessageEmbed()
            .setTitle('What\'s this? A new element has been unlocked!')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage('attachment://time.png');

        message.channel.send({embeds: [timeEmbed], files: [timeFile]})

        pData[message.author.id].items.push('time');
    }

    fs.writeFileSync(pFile, JSON.stringify(pData, null, 2));
}

function sendResult(message, results, client, user) {
    const files = results.filter(result => result).map(result =>
        new MessageAttachment(path.resolve(__dirname, '../../../assets/bigalchemy/' + result + '.png')));
    const embeds = results.filter(result => result).map(result => new MessageEmbed()
        .setAuthor(user.username, user.avatarURL())
        .setImage('attachment://' + result + '.png'));

    if (message.author.id === client.user.id) {
        message.edit({embeds: embeds, files: files, attachments: []});
    } else {
        message.channel.send({embeds: embeds, files: files, attachments: []})
    }
}

function hasItem(player, item) {
    return player.items.includes(item);
}