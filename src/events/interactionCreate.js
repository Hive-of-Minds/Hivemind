const Event = require('../structures/event');

module.exports = new Event({
    event: 'interactionCreate',
    async run(client, interaction) {
        if (interaction.isSelectMenu()) {
             if (interaction.customId === `translate ${client.prefix} ${interaction.user.id}`) {

            }
        }
    }
});