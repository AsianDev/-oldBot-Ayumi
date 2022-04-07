const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'confused',
cooldown: 10000,
description: "sends a confused anime gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/confused/token=569670023300382720.anZmEElUf6s6Fyqi4bz9`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))}}})