const Event = require('../../../Structures/Handlers/Event.js')
const Discord = require("discord.js");
const afkSchema = require("../../Structures/models/afk.js")
module.exports = new Event('messageCreate', async(client, message) => {
    
    if(message.author.bot) return;
    const checkafk = await afkSchema.findOne({Guild: message.guild.id, User: message.author.id})

    if(checkafk) {
        checkafk.delete()
        message.member.setNickname(null)
        const dataDeletedEmbed = new Discord.MessageEmbed()
        .setDescription(`Welcome back, you are no longer AFK! ${message.member}`)
        .setColor("#6A93F0")
        .setTimestamp()
        .setFooter({ text: `${message.author.tag}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true })}`})
        message.channel.send({embeds: [dataDeletedEmbed]})
    }

    const mentionedUser = message.mentions.users.first();
    if(mentionedUser) {

        const data = await afkSchema.findOne({Guild: message.guild.id, User: mentionedUser.id})
        if(data) {
            const CurrentlyAFK = new Discord.MessageEmbed()
            .setTitle(`${mentionedUser.username} is currently AFK!`)
            .setColor("#FCAEEB")
            .setDescription(`**__Reason:__**\n ${data.Reason}`)
            .addField(`**__Since:__**`, `<t:${Math.round(data.Date / 1000)}:R>`)
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            message.reply({embeds: [CurrentlyAFK], allowedMentions: {repliedUser: false}})
        }
    }
})