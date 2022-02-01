const muteSchema = require("../../util/models/muterole.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: "setmute",
description: "set the mute role for when you mute someone",
type: "TEXT",
cooldown: 10000,
userPermissions: ["MANAGE_GUILD"],
botPermissions: ["ADMINISTRATOR"],
aliases: ["setmuterole", "smute", "set-mute", "set-mute-role"],
async run(message, args, client) {
    const norole = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("This command is to set what role you will give for when someone gets muted")
    .addField("USAGE", "Iki smute < role >")
    .addField("If you wish to remove a role as well:", "Iki sremove < role > <- this will remove a role for when they get muted too"  )
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send({embeds: [norole]})
        muteSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                const embed = new Discord.MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(`<:x_:904736839036993586> *Waa~~* the role has already been set, reset it and try again please!`)
            
                message.channel.send({embeds: [embed]})
            } else {
                data = new muteSchema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                await data.save()
                const Embed2 = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`<:tick:904736864076955738> The mute role has been set to ${role}`)
                message.channel.send({embeds: [Embed2]})
            }
        })
    }
})