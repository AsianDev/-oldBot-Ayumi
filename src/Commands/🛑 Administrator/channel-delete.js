const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
module.exports = new Command ({
    name: "channel-delete",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 7000,
    aliases: ["delete-channel", "channeldelete", "deletehannel"],
    description: "deletes a channel",
    async run(message, args, client) {
      
      const channelNameQuery = args.slice(1).join(" ");
      if(!channelNameQuery) return client.errorEmbed(message, `*Waaa~* please mention the channel!`)
      message.guild.channels.create(channelNameQuery)
      .then(ch => {
          client.successEmbed(message, `Successfully Deleted \n ${ch}`)
      })    
  }})