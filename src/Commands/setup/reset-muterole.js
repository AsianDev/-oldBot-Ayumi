const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
const Schema = require("../../Structures/models/muterole.js")
module.exports = new Command({
name: "resetmute",
description: "reset the mute role!",
type: "TEXT",
cooldown: 10000,
userPermissions: ["MANAGE_GUILD"],
botPermissions: ["ADMINISTRATOR"],
aliases: ["resetmutrrole", "reset-mute", "reset-mute-role"],
async run(message, args, client) {

const embed = new Discord.MessageEmbed()
.setColor("DARK_RED")
.setDescription(`<:x_:904736839036993586> *Waa~~* the role has already been reset!`)

const embed2 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription("<:tick:904736864076955738> The mute role has been reseted!")
Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(err) throw err
        if(!data) {
            message.channel.send({embeds: [embed]})
        } else {
            await Schema.findOneAndDelete({ Guild: message.guild.id })
            message.channel.send({embeds: [embed2]})
        }
    })
}})
