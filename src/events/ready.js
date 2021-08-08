const Event = require('../structures/event.js');
//hello
module.exports = new Event('ready', client => {
    console.log(`I am now ${client.botPresence.status}, my name is ${client.user.username}#${client.user.discriminator}. My prefix is '${client.prefix}'`);
    client.user.setPresence({
        activity: {name: client.botPresence.activity},
        status: client.botPresence.status,
    });
    if (client.prefix === "h.") {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        client.channels.fetch('873797172246745138')
            .then(channel => {
                channel.send(`RESTARTED HIVEMIND at ${date} ${time}`)
            });
    }
});