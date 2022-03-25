const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
name: 'sleepy',

cooldown: 10000,
aliases: ["tired", "sleep"],
description: "sends a sleepy anime gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {  
  let kill = [
    `${message.author.username} oyasumi ZzZ`,
    `${message.author.username} is tired`,
    `${message.author.username} is sleepy`,
    `${message.author.username}  is sleepy... '-'`,
  ]
  const sleep = kill[Math.floor(Math.random() * kill.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/sleepy/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**${sleep}**`)
                        .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))
    }
}
})