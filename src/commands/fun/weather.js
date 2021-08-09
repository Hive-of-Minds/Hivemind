const Command = require('../../structures/command.js');
const weather = require('weather-js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'weather',
    description: 'weather command',
    emoji: '🌦️',
    aliases: ['climate', 'wthr', 'clmt'],
    arguments: '<city>',

    async run(message, args) {
        function getWeather(location) {
            weather.find({search: location, degreeType: 'C'}, (error, result) => {
                if (!result.length) return getWeather('Melbourne, Australia');

                const current = result[0].current;
                const temperature = current['temperature'];
                const feelsLike = current['feelslike'];
                const day = current['day'];
                const date = current['date'];
                const skyText = current['skytext'];
                const observationPoint = current['observationpoint'];
                const windDisplay = current['winddisplay'];
                const humidity = current['humidity'];
                const imageUrl = current['imageUrl'];

                const embed = new MessageEmbed()
                    .setTitle(observationPoint)
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setThumbnail(imageUrl)
                    .addField('Temperature', `${temperature}°C`, true)
                    .addField('Feels like', `${feelsLike}°C`, true)
                    .addField('Humidity', `${humidity}%`, true)
                    .addField('Wind', windDisplay, true)
                    .addField('Skies', skyText, true)
                    .setFooter(`${day}, ${date}`);
                message.reply({embeds: [embed]});
            });
        }
        getWeather(args.join(' ') || 'Melbourne, Australia');
    }
});