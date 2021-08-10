const Command = require('../../structures/command.js');
const api = require('imageapi.js')
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'meme',
    emoji: '🤣',
    description: 'Grabs a random meme from a list of subreddits.',

    async run (message, args) {
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
        let list = "";
        subreddits.forEach(r => list += r + ", ");
        list.substring(0,list.length - 2);

        if (args.length === 0) {
            let subreddit = subreddits[Math.floor(Math.random()*subreddits.length)];
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
        } else if (args.length === 1) {
            let subreddit = args[0];
            if (args[0] === "list") {
                message.reply(list.substring(0, list.length - 2));
            } else if (!subreddits.includes(subreddit)) {
                message.reply("This subreddit isn't on the list of subreddits that Hivemind can access as of right now. If you would like it to be added to this list, contact one of the developers");
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
        } else {
            message.reply("Too many subreddits were inputted");
        }
    }
})
