const { MessageEmbed } = require("discord.js")
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "dead",
    description: "ded chat",
    owner: true,
type: "Text",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        const Dead = new MessageEmbed()
            .setColor("DARKER_GREY")
            .setDescription("The chat had died!\n Its your job as a member to make it active! :3")
            .setImage('https://tenor.com/view/umaru-chan-anime-dead-chat-gif-25049722')
        message.channel.send({ embeds: [Dead] })
    }
})