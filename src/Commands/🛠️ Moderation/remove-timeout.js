const { Message,MessageEmbed, Client } = require("discord.js");
const ms = require('ms')
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({    
name: "remove-timeout",
    aliases: ['rt'],
    description: 'Remove the timeout of the mentioned member',
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: "MODERATE_MEMBERS",
    cooldown: 1000,    
type: "Text",

     async run(message, args, client) {
        const member = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[2]) :  message.mentions.members.first() ||  message.guild.members.cache.get(args[2])
        if(!member) return message.channel.send("mention someone please")
        const reason = args.slice(3).join(" ")
        if(!reason) return message.channel.send("Why are you timing out this user")

        let timer = ms(duration)
        const Tembed = new MessageEmbed()
        .setTitle('Timeout')
        .setThumbnail(member.displayAvatarURL({ dynamic: true}))
        .setColor('DARK_PURPLE')
        .addField("User:", `${member}`)
        .addField("Reason", `${reason}`, true)
        .setTimestamp()
        member.timeout(null, reason);
        message.channel.send({embeds: [Tembed]})
        client.channels.cache.get("924889631303012363").send({embeds: [Tembed]})

    }})