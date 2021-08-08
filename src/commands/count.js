module.exports = {
    name: 'count',
    description: 'Count command',
    execute(message, args) {
        message.channel.send(`Total member count: ${message.guild.memberCount}`);
    }
};