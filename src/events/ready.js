const Event = require('../structures/event.js');
const {table} = require('table');

module.exports = new Event({
    event: 'ready',
    async run(client) {
        let config = {
            header: {
                alignment: 'center',
                content: 'Discord Bot Info'
            }
        };
        let data = [
            ['username', client.user.username],
            ['discriminator', client.user.discriminator],
            ['id', client.user.id],
            ['prefix', client.prefix],
            ['status', client.status],
            ['activity', client.activity],
            ['activity-type', client.activityType],
        ];
        console.log(table(data, config));

        config = {
            header: {
                alignment: 'center',
                content: 'Command Info'
            }
        }
        data = client.commands.map(command => {
            return [command.name, command.description, `${client.prefix}${command.name} ${command.arguments ? command.arguments : ''}`];
        });
        console.log(table(data, config));

        if (client.prefix === "h.") {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            client.channels.fetch('873797172246745138')
                .then(channel => {
                    channel.send(`RESTARTED HIVEMIND at ${date} ${time}`)
                });
        }
    }
});