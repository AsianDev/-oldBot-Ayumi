const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'whowouldwin',
    aliases: ['wwn', "who-would-win"], 
    description: "who would win?",
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 cooldown: 4000,

    async run(message, args, client) {
        const user = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])

        const Nouser = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setDescription("*Waaa~* Please mention a user!")
        .setTitle("<:Ikix:904736839036993586>  MISSING ARGUEMENT")
        if(!user) return message.channel.send({embeds: [Nouser]})
        const av1 = message.author.displayAvatarURL({ format: "png" })
        const av2 = user.displayAvatarURL({ format: "png" })
        const img = `https://api.popcat.xyz/whowouldwin?image1=${encodeURIComponent(av1)}&image2=${encodeURIComponent(av2)}`
        const finalEmbed = new Discord.MessageEmbed()
        .setColor("ffc0cb")
        .setImage(img)
        message.channel.send({embeds: [finalEmbed]})

    }
})
