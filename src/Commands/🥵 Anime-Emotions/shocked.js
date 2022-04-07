const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
name: 'shocked',

aliases: ["shock"],
cooldown: 10000,
description: "sends a shocked anime gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {  
  const member = message.mentions.members.first() || message.author
  let kill = [
    `${message.author.username} has been shocked at the sight!`,
    `${message.author.username} is shocked!`,
  ]
  const kills = kill[Math.floor(Math.random() * kill.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/shocked/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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