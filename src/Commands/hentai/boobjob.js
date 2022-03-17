const Command = require('../../Structures/Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const nekoapi = require('cacao_nekoapi')

module.exports = new Command({

    name: "boobjob",
    description: "A Nsfw Command",
    type: "TEXT",
    aliases: ["bj", "boob-job"],
    userPermissions: "KICK_MEMBERS",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: true,

    async run(message, args, client) {

        let img = await nekoapi.rolplay_nsfw.boobjob()
        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img.url)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
