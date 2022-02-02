const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'amazing',
type: "TEXT",
cooldown: 10000,
aliases: ["amazed", "amazzing", "amzing"],
description: "shows an anime gif where your amazed",
userPermissions: ["SEND_MESSAGES"],
async run(message, args, client) {
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/amazing/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                    .setColor("RANDOM")
                        .setTitle(`${message.author.tag} is amazed`)
                    message.channel.send({ embeds: [embed] })
                }))
    }
}
})