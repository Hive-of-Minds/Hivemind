const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, '../rpg/playerdata.json');
const regex = /(?<=--)(\w+)(\s["'](.*?)["'])/g;

module.exports = new Command({
    name: 'create',
    description: 'create command',
    hidden: true,
    ownerOnly: true,

    async run(message) {
        let points = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        if (!points[message.author.id]) return message.reply('You need to make an account to use this command!');

        const attributes = [];

        while (arr = regex.exec(message)) {
            attributes.push([arr[1], arr[3]]);
        }

        let item = Object.fromEntries(attributes);

        if (!(item.type && item.name)) return message.reply('Missing required parameter: ' + (item.type ? 'Name' : 'Type'));

        points[message.author.id].inventory.push(item);

        fs.writeFileSync(dataPath, JSON.stringify(points, null, 2));
    }
});