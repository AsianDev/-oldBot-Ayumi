const premiumSchema = require("../../config/models/premium.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
const errorX = "<:Ikix:904736839036993586>"
const Bunny = "<a:Kawaii_Bunny:922261803583553556>"
const DB = require("../../config/models/loggerDB.js")

module.exports = new Command({
name: "premiumdel",
description: "Give premiumShip to a user",
 type: "Text",
cooldown: 10000,
userPermissions: [""],
botPermissions: ["ADMINISTRATOR"],
owner: true,
aliases: ["prem-del", "prem-remove", "premium-r", "p-remove", "remove-premium", "premium-remove"],
async run(message, args, client) {
   
    const Data = await DB.findOne({
        GuildID: message.guild.id,
    });
    if (!Data) return;

    const member = message.mentions.members.first()  || message.guild.members.cache.find(m => m.id === args[1])
    const role = message.guild.roles.cache.find((x) => x.name = '- Premium' || 'Premium Member' || 'Premium')
    if(!role) return;
    member.roles.remove(role)

        // if no member has been mentioned
        const NoMember = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("*Waaa~* please mention a user for me to remove premium ship from.")
            .setThumbnail("https://tenor.com/view/anime-confused-loading-paper-thinking-gif-23758618")
            .setTitle(`${errorX} AN ERROR OCCURED`)
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
    .setTitle(`${errorX} AN ERROR OCCURED`)


    // Gave premium embed 
    const RemoveEmbed = new Discord.MessageEmbed()
    .setColor("#FBD9F6")
    .setDescription(`${member} has lost their premiumship.`)

    premiumSchema.findOne({
        user: member.user.id
    }, async (err, data) => {
        if(!data) return message.reply({embeds: [NotPremMember]})

        data.delete();
        const logsChannel = message.guild.channels.cache.get(Data.Logs); 
        logsChannel.send({embeds: [RemoveEmbed]})    
        message.channel.send({embeds: [RemoveEmbed]})
    })
}})