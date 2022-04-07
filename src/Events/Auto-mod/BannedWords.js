const Event = require('../../Handlers/Event.js')
const Discord = require("discord.js")
const warndb = require('../../config/models/warndb.js')
const reason = "[Auto Mod] Sending Banned word"
module.exports = new Event("messageCreate", async (client, message) => {
    const array = require("../../config/assets/Json/BannedWord.json")
    if(array.includes(message.content.toLowerCase())) {
      message.delete()
        warndb.findOne({
            guild: message.guild.id,
            user: message.author.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: message.guild.id,
                    user: message.author.id,
                    content: [{
                        moderator: client.user.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: client.user.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

            const BannedWords = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle("<:Iki_pinkInfo:938460351576551444> Banned Word has been detected.\n")
            .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
            .addField("User:", `\`\`\`${message.author.tag} (${message.author.id})\`\`\``)
            .addField("Message Content:", `\`\`\`${message.content}\`\`\``)
            .setFooter({ text: `${message.author.tag} has been warned.`, iconURL: message.author.displayAvatarURL()})
      
          message.channel.send({embeds: [BannedWords]}).then((msg) => {
              setTimeout(() => msg.delete(), 8000)

              client.channels.cache.get("924889631303012363").send({embeds: [BannedWords]})
                
                }
              )
          })
     }
})  