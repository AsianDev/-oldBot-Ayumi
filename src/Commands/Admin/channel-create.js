const { Client, Message, MessageEmbed } = require("discord.js")
const Command = require('../../Handlers/Command.js')
module.exports = new Command ({
    name: "channel-create",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: "SEND_MESSAGES",
    type: "TEXT",
    cooldown: 10000,
    aliases: ["create-channel", "channelcreate", "createhannel"],
    description: "creates a channel",
    async run(message, args, client) {
        const channelNameQuery = args.slice(1).join(" ");
        if(!channelNameQuery) return message.channel.send("*Waa~~* please tell me a name to call this channel OwO")
        message.guild.channels.create(channelNameQuery)
        .then(ch => {
                message.channel.send(`${ch} has been made succesfully!`)
            })    
    }})