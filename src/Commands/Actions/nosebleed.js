const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'nosebleed',

aliases: ["nose-bleed"],
description: "sends an anime gif of nosebleed",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
cooldown: 10000,

  async run(message, args, client) {  
  const member = message.mentions.members.first() || message.author
  let kill = [
    `${message.author.username} nose has begun to bleed`,
    `${message.author.username} nose is bleeding!`,
    `Haha ${message.author.username}'s nose is bleeding`,
  ]
  const kills = kill[Math.floor(Math.random() * kill.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/nosebleed/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**${kills}**`)
                        .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))
    }
}
})