const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, '../rpg/data.json');

module.exports = new Command({
    name: 'buy',
    description: 'buy command',
    hidden: true,
    ownerOnly: true,

    async run(message, args) {
        try {
            let points = JSON.parse(fs.readFileSync(dataPath, "utf8"));

            if (!points[message.author.id]) {
                return message.reply('You need to make an account to use this command!');
            }

            let userData = points[message.author.id];

            const itemType = args.shift();
            const itemName = args.join(' ');

            userData.inventory.push({
                type: itemType,
                name: itemName
            });
            fs.writeFileSync(dataPath, JSON.stringify(points));
        } catch (e) {
            message.reply('An unknown error occurred.');
        }
    }
});