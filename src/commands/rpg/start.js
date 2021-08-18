const Command = require('../../structures/command.js');
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, '../rpg/data.json');

module.exports = new Command({
    name: 'start',
    description: 'start command',

    async run(message) {
        let points = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        if (points[message.author.id]) {
            return message.reply('You already have an account!');
        }

        const msg = message.reply('Please choose your username:');
        const filter = m => m.author.id === message.author.id;
        message.channel
            .awaitMessages({filter, max: 1, time: 60000, errors: ['time']})
            .then(response => {
                points = JSON.parse(fs.readFileSync(dataPath, "utf8"));
                for (const user in points)
                    if (points[user].username === response.first().content)
                        return response.first().reply(`${response.first().content} is already taken!`);

                points[message.author.id] = {
                    username: response.first().content,
                    health: 100,
                    maxHealth: 100,
                    balance: 500,
                    class: null,
                    guild: null,
                    inventory: []
                };
                fs.writeFileSync(dataPath, JSON.stringify(points));
                response.first().reply('Account created successfully!');
            })
            .catch(() => msg.reply('You ran out of time!'));

        // points[message.author.id] = {
        //     username: message.author.username,
        //     points: 0,
        // };
        // let userData = points[message.author.id];
        // userData.points += randomNumber(10, 20);
        // message.channel.send('You have begged and now have ' + userData.points + ' points!');
        // fs.writeFileSync(dataPath, JSON.stringify(points));
    }
});