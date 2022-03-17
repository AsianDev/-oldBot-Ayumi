const premiumSchema = require("../../Structures/models/premium.js")
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
const errorX = "<:Ikix:904736839036993586>"
const Bunny = "<a:Kawaii_Bunny:922261803583553556>"

module.exports = new Command({
name: "premiumdel",
description: "Give premiumShip to a user",
type: "TEXT",
cooldown: 10000,
userPermissions: [""],
botPermissions: ["ADMINISTRATOR"],
owner: true,
aliases: ["prem-del", "prem-remove", "premium-r", "p-remove", "remove-premium", "premium-remove"],
async run(message, args, client) {


    const member = message.mentions.members.first()  || message.guild.members.cache.find(m => m.id === args[1])


        // if no member has been mentioned
        const NoMember = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("*Waaa~* please mention a user for me to remove premium ship from.")
            .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
            .setTitle(`${errorX} Error`)
        if(!member) return message.reply({embeds: [NoMember]})


    const embed = new Discord.MessageEmbed()
    .setColor("#FBD9F6")
    .setTitle(`${member.user.tag} has lost Premiumship`)
    .setDescription(`${member} has been removed of their premiumship.`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

    // If they have the premium role already.
    const NotPremMember = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("*Waaa~* This user does not have premiumship to the server.")
    .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
    .setTitle(`${errorX} Error`)


    // Gave premium embed 
    const RemoveEmbed = new Discord.MessageEmbed()
    .setColor("#FBD9F6")
    .setDescription(`${member} has lost their premiumship.`)

    premiumSchema.findOne({
        user: member.user.id
    }, async (err, data) => {
        if(!data) return message.reply({embeds: [NotPremMember]})

        data.delete();
        client.channels.cache.get("933699822039498762").send({embeds: [embed]})
        message.channel.send({embeds: [RemoveEmbed]})
    })
}})