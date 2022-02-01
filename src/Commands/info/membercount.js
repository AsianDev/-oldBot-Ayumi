const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
        name: "membercount",
        description: "shows how many people are in the server",
        type: "TEXT",
        aliases: ["member-count", "count"],
        userPermissions: ["SEND_MESSAGES"],
        botPermissions: ["ADMINISTRATOR"],
        cooldown: 5000,
        async run(message, args, client) {
          const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Member Count of Ikigai`)
          .setDescription (`**Total:** ${message.guild.members.cache.size}\n **Members:** ${message.guild.members.cache.filter(member => !member.user.bot).size}\n **Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
          .setFooter({ text: `Requested by ${message.author.tag}`})
          .setTimestamp()
          .setFooter({ text: "Kaori©"})

         
              message.channel.send({embeds: [embed]})
      }
  })