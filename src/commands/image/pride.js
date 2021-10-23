const Command = require("../../structures/command.js");
const {createCanvas, loadImage} = require("canvas");
const {MessageAttachment} = require("discord.js");

module.exports = new Command({
    name: 'pride',
    description: 'show off some pride',
    aliases: ['pr'],
    hidden: true,

    async run(message) {
        const canvas = createCanvas(300, 200);
        const context = canvas.getContext('2d');
        const background = await loadImage('https://cdn.discordapp.com/attachments/867730676203257866/880778495070974062/unknown.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeRect(0,0, canvas.width, canvas.height);
        const avatar = await loadImage(message.author.displayAvatarURL({ format: 'png'}));
        context.drawImage(avatar, 100,50,100, 100);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        message.reply({files: [attachment]});
    }
});