const { Message,MessageEmbed, Client } = require("discord.js");
const Discord = require("discord.js")
const ms = require('ms')
const Command = require('../../Structures/Handlers/Command.js')

module.exports = new Command({ 
   name: "timeout",
    description: 'Give the mentioned member timeout',
    type: "TEXT",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: "MODERATE_MEMBERS",
        aliases: ["tm"],
     async run(message, args, client) {
      const member = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[2]) :  message.mentions.members.first() ||  message.guild.members.cache.get(args[2])
      if(!member) return message.channel.send("mention someone please")
        let reason = args.slice(3).join(" ")
        if(!reason) return message.channel.send("Why are you timing out this user")
        let duration = args[3]
        if(!duration) return message.reply("how long are you timeing out this user?")

        let timer = ms(duration)
        const Tembed = new MessageEmbed()
        .setTitle('Timeout')
        .setThumbnail(member.displayAvatarURL({ dynamic: true}))
        .setColor('DARK_PURPLE')
        .addField("User:", `${member}`)
        .addField("Time:", `${timer}`, true)
        .setTimestamp()
        member.timeout(timer, reason);
        message.channel.send({embeds: [Tembed]})
        client.channels.cache.get("924889631303012363").send({embeds: [Tembed]})

      

      }})