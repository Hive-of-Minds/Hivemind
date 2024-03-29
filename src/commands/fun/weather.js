const Command = require('../../structures/command.js');
const weather = require('weather-js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'weather',
    description: 'Shows the weather in the given city. Defaults to Melbourne.',
    emoji: '🌦️',
    aliases: ['wt'],
    arguments: '<city>',

    async run(message, args) {
        //Creates a function to access the weather api
        function getWeather(location) {
            weather.find({search: location, degreeType: 'C'}, (error, result) => {
                if (!result.length) return getWeather('Melbourne, Australia'); //Scenario in which the user didn't input a valid city

                const current = result[0].current; //Accesses the data of the city for the current day
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
                    .setColor('#DD8505')
                    .addField('Temperature', `${temperature}°C`, true)
                    .addField('Feels like', `${feelsLike}°C`, true)
                    .addField('Humidity', `${humidity}%`, true)
                    .addField('Wind', windDisplay, true)
                    .addField('Skies', skyText, true)
                    .setFooter(`${day}, ${date}`);
                message.reply({embeds: [embed]});
            });
        }
        getWeather(args.join(' ') || 'Melbourne, Australia'); //Runs the getWeather function and if there is no arguments after h.weather, then it sets the city as 'Melbourne, Australia'
    }
});