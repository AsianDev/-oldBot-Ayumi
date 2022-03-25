const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({

    name: "poll",
    description: "Make a poll",
    aliases: ["question", "pol", "questionare"],
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 cooldown: 5000,

    async run (message, args, client) {

    const poll = args.slice(1).join(' ')

    const pollembed = new Discord.MessageEmbed()
    .setTitle(`${poll}`)
    .setDescription("1️⃣ Yes\n\n2️⃣ No")
    .setColor("#4D9AE6")
    .setFooter({text
: `Poll by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
    .setTimestamp()

    const error = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("MISSING ARGUEMENT")
    .setDescription("kao poll <question here>")

    if (`${poll}` < 1) return message.channel.send({embeds: [error]})

    const msg = await message.channel.send({embeds: [pollembed]})

    msg.react('1️⃣')
    msg.react('2️⃣')
    }
})