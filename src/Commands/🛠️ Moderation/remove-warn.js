
const Command = require('../../Handlers/Command.js')
const warndb = require('../../config/models/warndb.js');
const Discord = require("discord.js")
module.exports = new Command({
    name: "removewarn",
    cooldown: 4000,
    description: "remove the warning off someone",
    userPermissions: ["KICK_MEMBERS"],
  botPermissions: "SEND_MESSAGES",
 aliases: ["rwarn", "remove-warn", "remove-warn", "raws", "removeallwarns", "remove-all-warns", "remove-awarns"],
    async run(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])

        const noUser = new Discord.MessageEmbed()
        .setColor("DARK_RED")
        .setTitle("MISSING ARGUEMENT")
        .setDescription("*Bakaa~* please mention a user to remove a warning from.")

        if (!user) return message.channel.send({embeds: [noUser]})


        const removedWarn = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Warnings removed.")
        .setTimestamp()
        .setThumbnail(`${user.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`<:tick:904736864076955738> Succesfully deleted a warning of ${user}`)

        warndb.findOne({
            guild: message.guild.id, 
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                let number = parseInt(args[2]) - 1
                data.content.splice(number, 1)
                message.channel.send({embeds: [removedWarn]})
                data.save()
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`<:x_:904736839036993586> ${user} does not have any warnings.`)
                message.channel.send({embeds: [embed]})

                client.channels.cache.get("924889631303012363").send({embeds: [removedWarn]})
            }
        })
    }
})