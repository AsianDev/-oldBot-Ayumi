const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
const guildConfig = require('../../Structures/models/guildConfig.js')

module.exports = new Command({
name: "suggestionchannel",
description: "set the suggestion channel to what you want it to be!",
type: "TEXT",
userPermissions: ["MANAGE_GUILD"],
botPermissions: ["ADMINISTRATOR"],
cooldown: 10000,
aliases: ["setsuggestion", "set-suggest", "setsuggest", "set-suggestion", "setsuggestionchannel", "set-suggestchannel", "set-suggestionchannel"],
async run(message, args, client) {
    const colour = require("../../config/assets/Json/colours.json")
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])

    const SuccessEmbed = new Discord.MessageEmbed()
    .setColor(colour.lightish_blue)
    .setTitle("Successfully set the Suggestion Channel. <a:exclamation_mark_red:915208461514604604>")
    .setDescription(`**${message.author.username}** You have set the suggestion channel!`)
    .addField("Suggestion Channel:", `<#${channel.id}>`)
    .setURL("https://media1.tenor.com/images/8d189128d67c185a55462f5a77f9e825/tenor.gif")

    const UpdatedEmbed = new Discord.MessageEmbed()
    .setColor(colour.lightish_blue)
    .setTitle("Successfully updated the suggestion Channel. <a:exclamation_mark_red:915208461514604604>")
    .setDescription(`**${message.author.username}** You have updated the suggestion channel!`)
    .addField("Suggestion Channel:", `<#${channel.id}>`)
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

    const Nochannel = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("Please mention the channel to set the suggestion channel as!")
    .setThumbnail("<:Ikix:904736839036993586> MISSING ARGUEMENT!")
    if (!channel) return message.reply({embeds: [Nochannel]})

    const data = await guildConfig.findOne({ guildId: message.guild.id }) 

    if (!data) {
        try {
            const data1 = await guildConfig.create({
                guildId: message.guild.id
            })

            await data1.updateOne({ suggestionChannel: channel.id })
            return message.reply({ embeds: [SuccessEmbed], components: [row], allowedMentions: {repliedUser: false} })
        } catch (error) {
            console.log(error)
        }
    } else if (data) {
        await data.updateOne({ suggestionChannel: channel.id })
        return message.reply({ embeds: [UpdatedEmbed], components: [row], allowedMentions: {repliedUser: false} })
    }
}
})   