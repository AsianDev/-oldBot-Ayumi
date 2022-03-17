const fetch = require("node-fetch")
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    name: "imdb",
    description: "Find the movie review by search!",
    cooldown: 5000,
    aliases: ["movie", "imdb-search"],
    type: "TEXT",   
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        const query = args.slice(1).join(" ");

        const Noquery = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setTitle("<:Ikix:904736839036993586> MISSING ARGUEMENT")
        .setDescription("Please provide a name of a movie to search for.")

        if(!query) return message.reply({embeds: [Noquery], allowedMentions: {repliedUser: false}})
        const result = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`).then(res => res.json());

        const Eroror = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setTitle("An Error Occured <:Ikix:904736839036993586>")
        .setDescription("*Waaa~* Something went wrong!")

        if(result.error) return message.reply({embeds: [Eroror]})
        const Result = new Discord.MessageEmbed()
            .setColor("#b39ef3")
            .setURL(result.imdburl)
            .setTitle(result.title)
            .addField("Ratings", result.ratings[0].value, true)
            .addField("Votes", result.votes, true)
            .addField("Country", result.country, true)
            .addField("Languages", result.languages, true)
            .addField("Box Office", result.boxoffice, true)
            .addField("Director", result.director, true)
            .addField("Run Time", result.runtime, true)
            .addField("Type", result.type, true)
            .addField("Released", new Date(result.released).toDateString(), true)
            .setDescription(result.plot.slice(0, 4093) + "..")

        message.reply({ embeds: [Result], allowedMentions: {repliedUser: false} })

    }
})