const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
module.exports = new Command ({
    name: "channel-delete",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    cooldown: 10000,
    aliases: ["delete-channel", "channeldelete", "deletehannel"],
    description: "deletes a channel",
    async run(message, args, client) {
       const channelTarget = message.mentions.channels.first() || message.channel
        channelTarget.delete()   
}})