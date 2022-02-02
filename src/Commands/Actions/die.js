const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'die',
type: "TEXT",
cooldown: 10000,
description: "dies..",
userPermissions: ["SEND_MESSAGES"],
async run(message, args, client) {

    let dies = [
       `${message.author.username} dies`,
       `${message.author.username} got wasted`,
       `${message.author.username} died`,
       `${message.author.username} tragically died`,
       `${message.author.username} is now dead`,
       `${message.author.username} rest in piece`,
       `${message.author.username} is dying`
      ];
      const die = dies[Math.floor(Math.random() * dies.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/die/token=569670023300382720.anZmEElUf6s6Fyqi4bz9`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                        .setDescription(`**${die}**`)
                    message.channel.send({ embeds: [embed] })
                }))
    }
}
})