const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const nekoapi = require('cacao_nekoapi')

module.exports = new Command({

    name: "ahegao",
    description: "A Nsfw Command",
   type: "Text",
    userPermissions: "KICK_MEMBERS",
  botPermissions: "SEND_MESSAGES",
    nsfw: true,
    type: "Text", 


    async run(message, args, client) {

        let img = await nekoapi.nsfw.ahegao()
        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img.url)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
