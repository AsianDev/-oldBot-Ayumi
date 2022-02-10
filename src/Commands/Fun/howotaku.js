const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
        name: "howotaku",
        description: "see how much of an otaku you are",
        userPermissions: ["SEND_MESSAGES"],
        botPermissions: "SEND_MESSAGES",
        type: "TEXT",
        cooldown: 5000,
        aliases: ["otaki%", "otaku", "otaku-level"],
    async run(message, args, client) {
        const member = message.mentions.users.first() || message.author

        const rng = Math.floor(Math.random() * 101);

        const image = [
            "https://cdn.discordapp.com/attachments/913754766436360222/918100143465693214/63524778.png",
            "https://cdn.discordapp.com/attachments/913754766436360222/918101001016311818/images.png",
            "",
        ]

        const embed = new Discord.MessageEmbed()
        .setImage(image[Math.floor(Math.random() * image.length)])
        .setDescription(`${member.username}** is ` + rng + "% otaku** <a:rainbowweeb:922010082735190077>")
        .setColor("RANDOM")
        .setTimestamp()
        .setTitle(`${member.username}'s otaku level is...`)

        message.channel.send({embeds: [embed]})     
    }
})