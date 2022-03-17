const { Message, MessageEmbed } = require("discord.js")
const Command = require('../../Structures/Handlers/Command.js')
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
            .setDescription("The chat had died!\N Its your job as a member to make it active! :3")
            .setImage('https://tenor.com/view/de-ad-ch-at-xd-chat-ded-dead-group-chat-ded-dead-gif-23993287')
            .setFooter({ text: "Wished the chat comes alive again :) "})
        message.channel.send({ embeds: [Dead] })
    }
})