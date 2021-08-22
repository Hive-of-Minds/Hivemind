const Command = require('../../structures/command.js');
const api = require('imageapi.js')
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'meme',
    emoji: '🤣',
    description: 'Grabs a random meme from a list of subreddits.',

    async run (message, args) {
        //subreddits is an array of strings that is used to access the corresponding subreddit
        let subreddits = [
            "memes",
            "dankmemes",
            "animemes",
            "animememes",
            "surrealmemes",
            "bonehurtingjuice",
            "Ausmemes",
            "cursedcomments",
            "Minecraftmemes",
            "ProgrammerHumor",
            "technicallythetruth"
        ];
        let list = ""; //list is used to store all of the subreddits in a string format and then be outputted when the user inputs h.meme list
        subreddits.forEach(r => list += r + ", "); //For each subreddit, a comma and space is added on the end
        list.substring(0,list.length - 2);

        //Scenario in which the user only inputs h.meme
        if (args.length === 0) {
            let subreddit = subreddits[Math.floor(Math.random()*subreddits.length)]; //Randomly generates a number and then accesses the corresponding element from the subreddits array
            try {
                let img = await api(subreddit); //Attempts to access imagejs.api, the api that is being used in order to access these images

                const embed = new MessageEmbed()
                    .setTitle("r/" + subreddit)
                    .setURL("https://reddit.com/r/" + subreddit)
                    .setImage(img);
                message.channel.send({embeds: [embed]});
            } catch (e) {
                message.reply("Problem occurred while trying to access r/" + subreddit);
            }
        //Scenario in which the user inputs h.meme [arg1]
        } else if (args.length === 1) {
            let subreddit = args[0];
            //Scenario in which [arg1] is 'list'
            if (args[0] === "list") {
                message.reply(list.substring(0, list.length - 2));
            //Scenario in which [arg1] isn't on the list of subreddits
            } else if (!subreddits.includes(subreddit)) {
                message.reply("This subreddit isn't on the list of subreddits that Hivemind can access as of right now. If you would like it to be added to this list, contact one of the developers");
            //Scenario in which [arg1] is a subreddit that is in the array of subreddits
            } else {
                try {
                    let img = await api(subreddit);

                    const embed = new MessageEmbed()
                        .setTitle("r/" + subreddit)
                        .setURL("https://reddit.com/r/" + subreddit)
                        .setImage(img);
                    message.channel.send({embeds: [embed]});
                } catch (e) {
                    message.reply("Problem occurred while trying to access r/" + subreddit);
                }
            }
        //Scenario in which the user inputs 2 or more arguments after h.meme
        } else {
            message.reply("Too many subreddits were inputted");
        }
    }
})
