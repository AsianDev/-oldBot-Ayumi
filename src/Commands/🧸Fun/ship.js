const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const block = "⬛"
const heart = "🟥"
const emotes = require("../../config/assets/Json/emotes.json")

module.exports = new Command({
    name: "ship",
    description: "Ships you with someone",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 10000,
type: "Text",

    async run(message, args, client) {
        const user = message.mentions.users.first();

        const noUser = new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
        .setDescription("*Waaa~* please mention a user to ship yourself with!")

        if (!user) return message.channel.send({embeds: [noUser]})
         if(user && user.id === message.author.id) {
         return message.reply({embeds: [noUser]})
         }
    if (message.mentions.users.size < 2) {
        let loveEmbed = new Discord.MessageEmbed()
            .setColor('dd2e44')
            .setTitle('Shipping...')
            .setDescription(`Shipped ${message.author} and ${user}!`)
            .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.author.displayAvatarURL({ dynamic: false, format: "png" })}&user2=${user.displayAvatarURL({ dynamic: false, format: "png" })}`)
            .addField(`**Ship Meter**`, ship())
            
       return message.channel.send({embeds: [loveEmbed]})

    } else if (message.mentions.users.size > 1) {
    let luv = new Discord.MessageEmbed()
            .setColor('dd2e44')
            .setTitle('Shipping...')
            .setDescription(`Shipped ${message.mentions.users.first()} and ${message.mentions.users.last()}!`)
            .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.mentions.users.first().displayAvatarURL({ dynamic: false, format: "png" })}&user2=${message.mentions.users.last().displayAvatarURL({ dynamic: false, format: "png" })}`)
            .addField(`**Ship Meter**`, ship())
        message.channel.send({embeds: [luv]})
    }
    }
    }

)
    function ship() {
        const hearts = Math.floor(Math.random() * 110) + 0;
        const hearte = (hearts/10)
      
        const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
        return str;
    }

