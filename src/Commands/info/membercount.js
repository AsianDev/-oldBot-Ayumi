const Discord = require("discord.js");
const Command = require('../../Structures/Handlers/Command.js')

module.exports = new Command({
        name: "membercount",
        description: "shows how many people are in the server",
        type: "TEXT",
        aliases: ["member-count", "count"],
        userPermissions: ["SEND_MESSAGES"],
        botPermissions: "SEND_MESSAGES",
        cooldown: 5000,
        async run(message, args, client) {
          const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Member Count of ${message.guild.name}`)
          .setDescription (`**Total:** ${message.guild.members.cache.size}\n **Members:** ${message.guild.members.cache.filter(member => !member.user.bot).size}\n **Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
          .setFooter({ text: `Requested by ${message.author.tag}`})
          .setTimestamp()
          .setThumbnail(message.guild.iconURL({dynamic: true}))
          .setFooter({ text: "Ayumi©"})

         
              message.channel.send({embeds: [embed]})
      }
  })