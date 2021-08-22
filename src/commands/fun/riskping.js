const Command = require('../../structures/command.js');

module.exports = new Command({
    name: 'riskping',
    description: 'A random chance of pinging everyone.',
    emoji: '🎲',

    async run(message) {

        const num = Math.round(Math.random() * 1000); //Randomly generates an integer between 1 and 1000

        //Scenario in which the randomly generated number is equal to 1000
        if (num === 1000) {
            message.channel.send('@everyone');
        //Scenario in which the randomly generated number is not equal to 1000
        } else {
            message.channel.send('you failed, are you proud of yourself? your a disapointment.')
        }
        message.channel.send(num.toString());
    }
});
