const premiumSchema = require("../../config/models/premium.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
const errorX = "<:Ikix:904736839036993586>"
const Bunny = "<a:Kawaii_Bunny:922261803583553556>"
const c = require("../../config/assets/Json/colours.json")
const DB = require("../../config/models/loggerDB.js")

module.exports = new Command({
name: "premiumadd",
description: "Give premiumShip to a user",
 type: "Text",
userPermissions: [""],
botPermissions: ["ADMINISTRATOR"],
aliases: ["premadd", "prem-add", "premium-add", "p-add", "add-premium"],
owner: true,
async run(message, args, client) {

    const Data = await DB.findOne({
        GuildID: message.guild.id,
    });
    if (!Data || !Data.Logs) return;

    const member = message.mentions.members.first()  || message.guild.members.cache.find(m => m.id === args[1])
    const role = message.guild.roles.cache.find((x) => x.name = '- Premium' || 'Premium Member' || 'Premium')

  if(!role) {
      role = message.guild.roles.create({
        data: {
            name: '- Premium',
            color: `${c.pink}`,
        },
        reason: `Needed to make a role for ${client.user.tag}'s premiumship system.`
      })
    .then(message.channel.send("<a:loading:938879666800967720> Creating a premium role."))
    .catch(console.error)
  }
    member.roles.add(role)

        const NoMember = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("*Waaa~* please mention a user for me to give premium ship to.")
            .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
            .setTitle(`${errorX} AN ERROR OCCURED`)
        if(!member) return message.reply({embeds: [NoMember]})

    const grantedPremium = new Discord.MessageEmbed()
    .setColor("#FBD9F6")
    .setDescription(`${member.user.tag} has been granted Premiumship ${Bunny}`)
    .setTitle(`${member.user.username} has been granted premiumship`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))


    const Nobotplease = new Discord.MessageEmbed()
    .setTitle(c["pale red"])
    .setTitle(`${errorX} AN ERROR OCCURED`)
    .setDescription("*Bakaa~* Bots can not have access to Premiumship <3")
    if (member.user.bot) return message.reply({embeds: [Nobotplease]})


    const AlreadyPremMember = new Discord.MessageEmbed()
    .setTitle(c["pale red"])
    .setDescription("*Waaa~* This user already has premiumship.")
    .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
    .setTitle(`${errorX} AN ERROR OCCURED`)


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
        const logsChannel = message.guild.channels.cache.get(Data.Logs); 
        logsChannel.send({embeds: [grantedPremium]})
        return message.channel.send({embeds: [SuccessEmbed]})
    })


}})