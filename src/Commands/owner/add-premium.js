const premiumSchema = require("../../Structures/models/premium.js")
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
const errorX = "<:Ikix:904736839036993586>"
const Bunny = "<a:Kawaii_Bunny:922261803583553556>"

module.exports = new Command({
name: "premiumadd",
description: "Give premiumShip to a user",
type: "TEXT",
userPermissions: [""],
botPermissions: ["ADMINISTRATOR"],
aliases: ["premadd", "prem-add", "premium-add", "p-add", "add-premium"],
owner: true,
async run(message, args, client) {

    // Premium role
    const member = message.mentions.members.first()  || message.guild.members.cache.find(m => m.id === args[1])
   
    // if no member has been mentioned
        const NoMember = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("*Waaa~* please mention a user for me to give premium ship to.")
            .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
            .setTitle(`${errorX} Error`)
        if(!member) return message.reply({embeds: [NoMember]})

    const embed = new Discord.MessageEmbed()
    .setColor("#FBD9F6")
    .setDescription(`${member.user.tag} has been granted Premiumship ${Bunny}`)
    .setTitle(`${member.user.username} has been granted premiumship`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))


    // No bots allowed hehe
    const Nobotplease = new Discord.MessageEmbed()
    .setTitle("RED")
    .setDescription("*Bakaa~* Bots can not have access to Premiumship <3")
    if (member.user.bot) return message.reply({embeds: [Nobotplease]})


    // If they have the premium role already.
    const AlreadyPremMember = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("*Waaa~* This user already has premiumship.")
    .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
    .setTitle(`${errorX} Error`)


    // Gave premium embed 
    const SuccessEmbed = new Discord.MessageEmbed()
    .setColor("#FBD9F6")
    .setDescription(`${member} has been granted Premiumship ${Bunny}`)

    premiumSchema.findOne({
        user: member.user.id
    }, async (err, data) => {
        if(data) return message.reply({embeds: [AlreadyPremMember]})

        new premiumSchema({
            user: member.user.id
        }).save();
        client.channels.cache.get("933699822039498762").send({embeds: [embed]})
        return message.channel.send({embeds: [SuccessEmbed]})
    })


}})