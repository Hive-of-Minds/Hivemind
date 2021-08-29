const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const pFile = path.resolve(__dirname, '../alchemy/players.json');

module.exports = new Command({
    name: 'astart',
    description: 'alchemy start command',

    async run(message) {
        let pData = JSON.parse(fs.readFileSync(pFile, "utf8"));

        if (pData[message.author.id]) return message.reply('You already have an account!');

        const msg = message.reply('Please choose your username:');
        const filter = m => m.author.id === message.author.id;
        message.channel
            .awaitMessages({filter, max: 1, time: 60000, errors: ['time']})
            .then(response => {
                pData = JSON.parse(fs.readFileSync(pFile, "utf8"));
                for (const player in pData)
                    if (pData[player].username === response.first().content)
                        return response.first().reply(`'${response.first().content}' has already been taken!`);

                pData[message.author.id] = {
                    username: response.first().content,
                    items: ['fire', 'water', 'air', 'earth']
                };
                fs.writeFileSync(pFile, JSON.stringify(pData));
                response.first().reply('Account created successfully!');
            })
            .catch(() => msg.reply('You ran out of time!'));
    }
});