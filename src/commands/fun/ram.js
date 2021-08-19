const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'ram',
    description: 'not good enough nathan',
    emoji: '🐏',

    async run(message) {
        message.channel.send('https://www.youtube.com/watch?v=na8pHdtfWCs&feature=youtu.be');
    }
});
