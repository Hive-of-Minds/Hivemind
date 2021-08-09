const Event = require('../structures/event.js');

module.exports = new Event({
    event: 'messageDelete',
    async run(client, message) {
        const snipes = message.client.snipes.get(message.channel.id) || [];
        if (message.attachments.size > 0) {
            snipes.unshift({
                attachments: message.attachments[0],
                content: message.content,
                author: message.author
            })
        } else {
            snipes.unshift({
                content: message.content,
                author: message.author
            })
        }
        message.client.snipes.set(message.channel.id, snipes);
    }
});