const { Client, Message, MessageEmbed } = require("discord.js")
const Command = require('../../Handlers/Command.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command ({
    name: "channel-create",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 7000,
    aliases: ["create-channel", "channelcreate", "createhannel"],
    description: "creates a channel",

    async run(message, args, client) {

        const channelNameQuery = args.slice(1).join(" ");
        if(!channelNameQuery) return client.errorEmbed(message, `*Waaa~* please give a name for this channel!`)
        message.guild.channels.create(channelNameQuery)
        .then(ch => {
            client.successEmbed(message, `Successfully made a new Channel: \n ${ch}`)
        })    
    }})