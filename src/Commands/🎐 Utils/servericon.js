const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({  
name: "servericon",
  aliases: ["sav", "guildavatar", "icon"],
  description: "Get avatar of the server",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "MANAGE_GUILD",
 type: "Text",  cooldown: 10000,

  async run(message, args, client) {

    const avtEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setImage(message.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
        .setDescription(`**[Download Icon:](${message.guild.iconURL()})**`)

          message.channel.send({ embeds: [avtEmbed] })
  }})