const { Message, MessageEmbed } = require("discord.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    name: "dead",
    description: "ded chat",
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],


    async run(message, args, client) {

        const Dead = new MessageEmbed()
            .setColor("DARKER_GREY")
            .setDescription("**THE CHAT IS DEAD EVERYONE WAKE UP!!**")
            .setImage("https://api.kawaii.red/gif/baka/baka12.gif?size=1024")
        message.channel.send({ embeds: [Dead] })
    }
})