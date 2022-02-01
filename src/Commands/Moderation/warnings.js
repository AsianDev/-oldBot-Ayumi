const Command = require('../../Handlers/Command.js')
const { MessageEmbed } = require('discord.js')
const warndb = require('../../util/models/warndb.js')
const Discord = require("discord.js")
module.exports = new Command({
        name: "warnings",
        description: "someone has warnings",
        userPermissions: ["KICK_MEMBERS"],
        botPermissions: ["ADMINISTRATOR"],
        type: "TEXT",
        cooldown: 10000,

        async run(message, args, client) {
            const target = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author
            warndb.findOne({
                guild: message.guild.id, 
                user: target.id
            }, async (err, data) => {
                if (err) throw err
                if (data) {
                    const e = data.content.map((w, i) => `\n\n\`${i + 1}\` - **Moderator:** \`${message.guild.members.cache.get(w.moderator).user.tag}\` \n **Reason:** \`\`${w.reason}\`\``)
                    const embed = new MessageEmbed()
                    .setDescription(e.join(' '))
                    .setTitle(`<:Iki_Mod:904219716195868752> ${target.user.tag}'s Warnings`)
                    .setColor("#E6604D")
                    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${client.user.displayAvatarURL()}`})
                    .setThumbnail(`${target.displayAvatarURL({  dynamic: true })}`)
                    message.channel.send({
                        embeds: [embed]
                    })
                } else {
                    const embed2 = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTimestamp()
                    .setTitle("Warnings:")
                    .setDescription(`${target} does not have any warnings`)
                    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${client.user.displayAvatarURL()}`})

                    message.channel.send({embeds: [embed2]})
                }
            })
        }
    })