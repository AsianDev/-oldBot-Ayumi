const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
    
name: "highfive",
botPermissions: 'SEND_MESSAGES',
 type: "Text",
cooldown: 10000,
description: "sends a anime h5 gif",
userPermissions: ["SEND_MESSAGES"],
aliases: ["h5"],
async run(message, args, client) {
    const member = message.mentions.members.first() || message.author

  let dies = [
    `${message.author.username} highfives ${member}`,
    `${member} has been highfived by ${message.author.username}`,
    `${message.author.username} highfives ${member}`,
    `${member} has been h5ed by ${message.author.username}`,

   ];
   const die = dies[Math.floor(Math.random() * dies.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/highfive/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))
    }

    else if (message.mentions.members.size !== 0) {

        const url = await fetch(`https://kawaii.red/api/gif/highfive/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`**${die}**`)
        message.channel.send({
            embeds: [embed1]})
    }
}
})