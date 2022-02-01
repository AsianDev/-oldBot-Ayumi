const {  Message, MessageEmbed } = require("discord.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
module.exports = new Command({
    name: "dm",
    aliases: ["msg", "message"],
    description: "Dm a user",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["ADMINISTRATOR"],
        type: "TEXT",
    cooldown: 5000,
    async run(message, args, client) {

        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author
        const log = client.channels.cache.find(c => c.id === "932285249205960764");

        const embed = new MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .addField("**Message:**", args.slice(2).join(" "))
        .addField("Moderator:", `<@${message.author.id}>`)
        .setTimestamp()
        .setColor("#FB7BEA") 
        try {
        member.send({embeds: [embed]})
    } catch(error) {
        log.send("Can not send dm to this user.")
    }
        const embed1 = new MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .addField("**Message:**", args.slice(2).join(" "))
        .addField("Moderator:", `<@${message.author.id}>`)
        .addField("User sent to:", `<@${member.id}>`)
        .setTimestamp()
        .setColor('RANDOM')
        log.send({embeds: [embed1], content: "New dm has been sent"})

        const embed3 = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`<@${message.author.id}> your dm has been sent to <@${member.id}> <a:KumaDance:922596036164345926>`)
        message.channel.send({embeds: [embed3]})

}})
