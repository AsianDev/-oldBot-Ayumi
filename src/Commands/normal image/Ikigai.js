const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    name: "fanart",
    description: "Showcases Kaori fanart",
    permission: "SEND_MESSAGES",
    type: "TEXT",
    cooldown: 10000,
    aliases: ["fan-art", "art"],
    async run(message, args, client) {
        const image = [
            "https://cdn.discordapp.com/attachments/919925505468280853/920925685604810792/download20211200132135.png",
    
        ]
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(image[Math.floor(Math.random() * image.length)])
        .setDescription("**Name:** kao")

        message.channel.send({embeds: [embed]}) 

}});

