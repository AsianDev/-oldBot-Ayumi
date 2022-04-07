const removerole = require("../../config/models/removerole.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: "set-remove",
description: "set the remove role for when someone is muted.",
 type: "Text",
cooldown: 10000,
userPermissions: ["MANAGE_GUILD"],
botPermissions: ["ADMINISTRATOR"],
aliases: ["setremoverole", "sremove", "set-removerole"],
async run(message, args, client) {
    const norole = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("This command is to set what role you will remove for when someone gets muted")
    .addField("USAGE", "Ayu sremove < role >")
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if(!role) return message.channel.send({embeds: [norole]})
        removerole.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                const embed = new Discord.MessageEmbed()
                .setColor("DARK_RED")
                  .setDescription(`<:x_:904736839036993586> *Waa~~* the role to remove has already been set, reset it and try again please!`)
            
                message.channel.send({embeds: [embed]})
            } else {
                data = new muteSchema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                await data.save()
                message.channel.send(`<:tick:904736864076955738> The role that will be removed has been set`)
            }
        })
    }
})