const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'hide',
botPermissions: 'SEND_MESSAGES',
 type: "Text",
description: "hide!",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
cooldown: 10000,

  async run(message, args, client) {
    const member = message.mentions.members.first() || message.author
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/hide/token=569670023300382720.anZmEElUf6s6Fyqi4bz9`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                        .setTitle( `${message.author.username} is hiding!`)
                    message.channel.send({ embeds: [embed] })
                }))
    }
    else if (message.mentions.members.size !== 0) {

        const url = await fetch(`https://kawaii.red/api/gif/hide/token=569670023300382720.anZmEElUf6s6Fyqi4bz9`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`${message.author} hides from ${member}`)

        message.channel.send({
            embeds: [embed1]})
    }
}
})