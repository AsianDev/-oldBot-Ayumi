/** @format */

const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js")
module.exports = new Event("messageUpdate", async (client, message, newMessage) => {
    if (message.author.bot) return;

    const embed = new Discord.MessageEmbed()
        .setDescription(`**Message Edit in:** <#${message.channel.id}>`)
        .setTitle(`Message Author: **${message.author.tag}**`)
        .addField("Before:", `> ${message.content}`)
        .addField("After:", `> ${newMessage.content}`)
        .addField("Message Link:", `[Jump to the message](${newMessage.url})`)
        .setTimestamp()
        .setColor("#E6604D")
        client.channels.cache.get("933705774599905360").send({embeds: [embed]})})