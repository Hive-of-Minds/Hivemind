const Command = require('../../structures/command');
const fs = require('fs');
const path = require('path');
const {MessageAttachment, MessageEmbed} = require('discord.js');
const Canvas = require("canvas");
const GIFEncoder = require("gif-encoder-2");
const pFile = path.resolve(__dirname, '../alchemy/players.json');
const rFile = path.resolve(__dirname, '../alchemy/recipes.json')

module.exports = new Command({
    name: 'acraft',
    description: 'alchemy craft command',
    arguments: '<item>, <item>',
    cooldown: 10,

    async run(message, args, client) {
        // Read data files
        const rData = JSON.parse(fs.readFileSync(rFile, 'utf-8'))
        let pData = JSON.parse(fs.readFileSync(pFile, 'utf-8'))

        // Check if user has account
        if (!pData[message.author.id]) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You need an account to run this command.')
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        // Change args split to ',' (for multi word items)
        args = args.join(' ').split(',');

        // Check that 2 items were given
        if (args.length < 2) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Correct usage: \`${client.prefix}${this.name} ${this.arguments}\``)
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        // Get item args
        const first = args[0].trim();
        const second = args[1].trim();

        // Get expected product (a+b or b+a)
        let results = rData[first + '+' + second] || rData[second + '+' + first];

        // Check that there is a product
        if (!results) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('Invalid recipe.')
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        // Check that player has required items
        if (!(hasItem(pData[message.author.id], first) && hasItem(pData[message.author.id], second))) {
            console.log(first + ', ' + second)
            const missingItems = [first, second].filter(item => !hasItem(pData[message.author.id], item));

            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You are missing items: ' + missingItems.join(', '))
                .setAuthor(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorEmbed]});
        }

        // Skip the animation if
        if (results.every(result => hasItem(pData[message.author.id], result))) {
            sendResult(message, results, client, message.author);
            return saveData(message, pData, results);
        }

        const itemAttachment = await craftGif(first, second);
        const itemEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage(`attachment://${first.replace(' ', '_')}_${second.replace(' ', '_')}.gif`);

        message.channel.send({embeds: [itemEmbed], files: [itemAttachment]}).then(msg => setTimeout(() => {
            sendResult(msg, results, client, message.author);
            saveData(message, pData, results);
        }, 5000));
    }
});

function saveData(message, pData, results) {
    // Update file incase changes occurred since initial read
    pData = JSON.parse(fs.readFileSync(pFile, 'utf8'));

    // Add all new items to inventory (checks for duplicates)
    results.filter(result => !hasItem(pData[message.author.id], result)).forEach(result => pData[message.author.id].items.push(result));

    // Give user 'time' item if 100 items reached
    if (pData[message.author.id].items.length >= 100 && !hasItem(pData[message.author.id], 'time')) {
        const timeFile = new MessageAttachment(path.resolve(__dirname, '../../../assets/bigalchemy/time.png'));
        const timeEmbed = new MessageEmbed()
            .setTitle('What\'s this? A new element has been unlocked! You have discovered \'time\'!')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage('attachment://time.png');

        message.channel.send({embeds: [timeEmbed], files: [timeFile]})

        pData[message.author.id].items.push('time');
    }

    // Update file with new data
    fs.writeFileSync(pFile, JSON.stringify(pData, null, 2));
}

function sendResult(message, results, client, user) {

    // Load all images
    const files = results.filter(result => result).map(result =>
        new MessageAttachment(path.resolve(__dirname, '../../../assets/bigalchemy/' + result.replace(' ', '_') + '.png')));

    // Create all embeds
    const embeds = results.filter(result => result).map(result => new MessageEmbed()
        .setAuthor(user.username, user.avatarURL())
        .setTitle(result)
        .setImage('attachment://' + result.replace(' ', '_') + '.png'));

    // Edit original message if sent by bot
    // Otherwise just send a new message
    if (message.author.id === client.user.id) {
        message.edit({embeds: embeds, files: files, attachments: []});
    } else {
        message.channel.send({embeds: embeds, files: files, attachments: []})
    }
}

async function craftGif(first, second) {
    const canvas = Canvas.createCanvas(132 * 3, 132);
    const ctx = canvas.getContext('2d');

    const firstImg = await Canvas.loadImage(path.resolve(__dirname, '../../../assets/bigalchemy/' + first.replace(' ', '_') + '.png'));
    const secondImg = await Canvas.loadImage(path.resolve(__dirname, '../../../assets/bigalchemy/' + second.replace(' ', '_') + '.png'));


    // console.log(first)
    // console.log(second)
    const encoder = new GIFEncoder(132 * 3, 132);
    encoder.setRepeat(-1);
    encoder.setTransparent(true);
    encoder.start();

    ctx.drawImage(firstImg, 0, 0, canvas.width / 3, canvas.height);
    ctx.drawImage(secondImg, canvas.width * 2 / 3, 0, canvas.width / 3, canvas.height);
    encoder.addFrame(ctx);

    for (let i = 0; i < canvas.width / 2 - 132 / 2; i += 5) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(firstImg, i, 0, canvas.width / 3, canvas.height);
        ctx.drawImage(secondImg, canvas.width * 2 / 3 - i, 0, canvas.width / 3, canvas.height);
        encoder.addFrame(ctx);
    }

    encoder.finish();

    return new MessageAttachment(encoder.out.getData(), `${first.replace(' ', '_')}_${second.replace(' ', '_')}.gif`);
}

function hasItem(player, item) {
    // Checks if the player has a specific item
    return player.items.includes(item);
}