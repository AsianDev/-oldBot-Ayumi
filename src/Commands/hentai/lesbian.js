const Command = require('../../Structures/Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "lesbian",
    description: "A Nsfw Command",
    type: "TEXT",
    userPermissions: "KICK_MEMBERS",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: true,


    async run(message, args, client) {

  
        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(url)

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
