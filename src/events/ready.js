const Event = require('../structures/event.js');
const {table} = require('table');

module.exports = new Event({
    event: 'ready',
    async run(client) {
        let tableConfig = {
            header: {
                alignment: 'center',
                content: 'Discord Bot Info'
            }
        };
        let tableData = [
            ['username', client.user.username],
            ['discriminator', client.user.discriminator],
            ['id', client.user.id],
            ['prefix', client.prefix],
            ['time', (performance.now() - client.startTime).toFixed(0) + 'ms']
        ];
        console.log(table(tableData, tableConfig));
        tableConfig = {
            header: {
                alignment: 'center',
                content: 'Command Info'
            }
        }
        tableData = [['\x1b[1mName\x1b[0m', '\x1b[1mDescription\x1b[0m', '\x1b[1mUsage\x1b[0m', '\x1b[1mCategory\x1b[0m']].concat(client.commands.map((folder, command) => {
            return [command.name, command.description, `${client.prefix}${command.name} ${command.arguments || ''}`, folder];
        }));
        console.log(table(tableData, tableConfig));

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