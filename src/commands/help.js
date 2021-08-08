module.exports = {
    name: 'help',
    description: 'Help command',
    execute(message, args) {
        message.channel.send('Help Menu: \n • `h.count` \n • `h.help` \n • `h.ping`');
    }
}