const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    name: "lyrics",
    description: "Find the lyrics of a song by search!",
    cooldown: 5000,
    aliases: ["song"],
type: "Text",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {
        try{
        const song = args.slice(1).join(" ");
        const Nosong = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setTitle("<:Ikix:904736839036993586> MISSING ARGUEMENT")
        .setDescription("Please provide the song name!")
        if (!song) return message.channel.send({embeds: [Nosong]})
        const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json())
        const Eroror = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setTitle("AN ERROR OCCURED <:Ikix:904736839036993586>")
        .setDescription("*Waaa~* Something went wrong!")
        if (json.error) return message.reply({embeds: [Eroror], allowedMentions: {repliedUser: false}})
        const url = `${song.replace(" ", "+")}`
        let lyrics = json.lyrics;
        if (lyrics.length > 4096) lyrics = `Too long to show, visit [https://popcat.xyz/lyrics/${url}](https://popcat.xyz/lyrics/${url}) For the full lyrics`
        const LyricsEmbed = new Discord.MessageEmbed()
            .setTitle(json.full_title === "None" ? json.title : json.full_title)
            .setURL(json.url)
            .setThumbnail(json.image)
            .addField("Artist", json.artist)
            .setDescription("**Lyrics:**\n\n" + lyrics)
            .setColor("ffc0cb")
        message.channel.send({embeds: [LyricsEmbed]})
        }catch(e) {
            return console.log(e)
        }
    }
})