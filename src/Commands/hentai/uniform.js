const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const nekoapi = require('cacao_nekoapi')

module.exports = new Command({

    name: "uniform",
    description: "A Nsfw Command",
    type: "TEXT",
    aliases: ["schooluniform"],
    userPermissions: "KICK_MEMBERS",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: true,

    async run(message, args, client) {

      
        let img = await nekoapi.nsfw.uniform()
        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img.url)

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
