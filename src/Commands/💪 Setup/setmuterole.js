const muteSchema = require("../../config/models/muterole.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: "setmute",
description: "Set the mute role for when you mute someone",
 type: "Text",
cooldown: 10000,
userPermissions: ["MANAGE_GUILD"],
maintance: true,
botPermissions: ["ADMINISTRATOR"],
aliases: ["setmuterole", "smute", "set-mute", "set-mute-role", "set-muterole", "set-mrole"],
async run(message, args, client) {
   
    const colour = require("../../config/assets/Json/colours.json")
    const role = message.mentions.roles.first() 
    const SuccessEmbed = new Discord.MessageEmbed()
    .setColor(colour.lightish_blue)
    .setTitle("Successfully set the Mute Role. <a:exclamation_mark_red:915208461514604604>")
    .setDescription(`**${message.author.username}** You have set the Mute Role!`)
    .addField("Mute Role:", `<@&${role.id}>`)
    .setURL("https://media1.tenor.com/images/8d189128d67c185a55462f5a77f9e825/tenor.gif")

    const UpdatedEmbed = new Discord.MessageEmbed()
    .setColor(colour.lightish_blue)
    .setTitle("Successfully updated the Mute Role. <a:exclamation_mark_red:915208461514604604>")
    .setDescription(`**${message.author.username}** You have updated the Mute Role!`)
    .addField("Mute Role:", `<@&${role.id}>`)
    .setURL("https://media1.tenor.com/images/8d189128d67c185a55462f5a77f9e825/tenor.gif")
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setLabel("Success")
        .setCustomId("Succes")
        .setStyle("PRIMARY")
        .setDisabled(true)
        .setEmoji("916869194400796772")
    )

    const Norole = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("Please mention a valid role!")
    .setThumbnail("<:Ikix:904736839036993586> MISSING ARGUEMENT!")
    if (!role) return message.reply({embeds: [Norole]})

    const data = await muteSchema.findOne({ Guild: message.guild.id }) 

    if (!data) {
        try {
            const data1 = await muteSchema.create({
                Guild: message.guild.id,
                Role: role
            })
            await data1.updateOne({ Role: role.id })
            return message.reply({ embeds: [SuccessEmbed], components: [row], allowedMentions: {repliedUser: false} })
        } catch (error) {
            console.log(error)
        }
    } else if (data) {
        await data.updateOne({ Role: role.id })
        return message.reply({ embeds: [UpdatedEmbed], components: [row], allowedMentions: {repliedUser: false} })
    }}
})   