const Event = require('../structures/event.js');

module.exports = new Event('ready', client => {
    console.log(`I am now ${client.botPresence.status}, my name is ${client.user.username}#${client.user.discriminator}`);

    client.user.setPresence({
        activity: {name: client.botPresence.activity},
        status: client.botPresence.status,
    });
});