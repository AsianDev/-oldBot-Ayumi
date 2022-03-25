const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
const schema = require("../../config/models/removerole.js")
module.exports = new Command({
name: "resetremove",
description: "reset the remove role!",
 type: "Text",
cooldown: 10000,
userPermissions: ["MANAGE_GUILD"],
botPermissions: ["ADMINISTRATOR"],
aliases: ["resetremoverole", "reset-remove", "reset-remove-role"],
async run(message, args, client) {

const embed = new Discord.MessageEmbed()
.setColor("DARK_RED")
.setDescription(`<:x_:904736839036993586> *Waa~~* the role has already been reset!`)

const embed2 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription("<:tick:904736864076955738> The remove role has been reseted!")
schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(err) throw err
        if(!data) {
            message.channel.send({embeds: [embed]})
        } else {
            await schema.findOneAndDelete({ Guild: message.guild.id })
            message.channel.send({embeds: [embed2]})
        }
    })
}})
