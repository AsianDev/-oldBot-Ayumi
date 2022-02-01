/** @format */

const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js")
module.exports = new Event("messageDelete", async (client, message) => {
    const embed = new Discord.MessageEmbed()
     .setDescription(`**Message Deleted in:** <#${message.channel.id}>`)
        .setTitle(`Message Author: **${message.author.tag}**`)
        .addField("Content:", `> ${message.content}` || `Un-identified content.`)
        .setTimestamp()
        .setImage(message.attachments.first()?.proxyURL || null)
        .setColor("#E6604D")
        client.channels.cache.get("933705774599905360").send({embeds: [embed]})})