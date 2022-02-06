const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js");
const reason = "[Auto Mod] Sending Scam link."
module.exports = new Event("messageCreate", async (client, message) => {
    const array = require("../../config/assets/Json/ScamLinks.json")
    const Member = message.member
   if(array.includes(message.content.toLowerCase())) {

      message.delete()
        const Scammed = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setTitle("<:Iki_pinkInfo:938460351576551444> Banned Link has been detected.\n")
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .addField("User:", `\`\`\`${message.author.tag} (${message.author.id})\`\`\``)
      .addField("Message Content:", `\`\`\`${message.content}\`\`\``)

      let a = new Discord.MessageButton()
      .setCustomId('accept')
      .setStyle("PRIMARY")
      .setLabel("Kick?")

      let b = new Discord.MessageButton()
      .setCustomId('decline')
      .setStyle("DANGER")
      .setLabel("Delete Embed")

      let c = new Discord.MessageButton()
      .setCustomId("Ban")
      .setStyle("SUCCESS")
      .setLabel("Ban?")

      let row = new Discord.MessageActionRow().addComponents(a, b, c)
      const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
      const ScamEmbed = await message.channel.send({embeds: [Scammed], components: [row]})

      const nOPerm = new Discord.MessageEmbed()
      .setColor("#36393f")
      .setDescription("You do not have permission to kick members.")
      const nOPerm2 = new Discord.MessageEmbed()
      .setColor("#36393f")
      .setDescription("You do not have permission to ban members.")
      const nOPerm3 = new Discord.MessageEmbed()
      .setColor("#36393f")
      .setDescription("You do not have permission to delete this embed.")


      collector.on('collect', async (m) => {
          if (m.customId === 'accept') {
                if(m.member.permissions.has("KICK_MEMBERS")) 
              Member.kick({days: 7, reason: reason})
              if(!m.member.permissions.has("KICK_MEMBERS")) 
              message.channel.send({embeds: [nOPerm], ephemeral: true })

              a.setDisabled(true)
              b.setDisabled(true)
              c.setDisabled(true)
              row = new Discord.MessageActionRow().addComponents(a, b, c)
            await m.update({embeds: [new Discord.MessageEmbed()
              .setTitle("<:Iki_info:936545458023698433> Banned Link has been detected.\n")
              .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`<:Iki_tick:904736864076955738> Punished ${message.author} for ${reason}`)
            .addField("User:", `\`\`\`${message.author.tag} (${message.author.id})\`\`\``)
            .addField("Message Content:", `\`\`\`${message.content}\`\`\``)
            .setColor("WHITE")
            .setTimestamp()], components: [row]})  
          }
          if (m.customId === 'decline') {
            if(m.member.permissions.has("KICK_MEMBERS")) 
           ScamEmbed.delete()
           if(!m.member.permissions.has("KICK_MEMBERS")) 
           message.channel.send({embeds: [nOPerm3], ephemeral: true })
          }

          if (m.customId === "Ban") {
            if(m.member.permissions.has("BAN_MEMBERS")) 
            Member.ban({days: 7, reason: reason})
            if(!m.member.permissions.has("BAN_MEMBERS")) 
            message.channel.send({embeds: [nOPerm2], ephemeral: true })
        }
         
      })
      client.channels.cache.get("924889631303012363").send({embeds: [Scammed]})

    }
})