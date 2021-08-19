const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'riskping',
    description: 'A random chance of pinging everyone.',
    emoji: '🎲',

    async run(message) {

        const owo = Math.round(Math.random() * 1000);

        if (owo === 1000) {
            message.channel.send('@everyone');
        } else {

            message.channel.send('you failed, are you proud of yourself? your a disapointment.')
        }
        message.channel.send(owo.toString());
    }
});
