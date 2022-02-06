const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js");
const colour = require("../../config/assets/Json/colours.json")
module.exports = new Event("guildMemberAdd", async (client, member, message) => { 


    const joinLogsEmbed = new Discord.MessageEmbed()
    .setColor(`${colour["light green"]}`)
    .setAuthor({ name: `${member.user.tag}`,iconURL: `${member.user.displayAvatarURL()}`})
    .setTitle("New user has joined Ikigai")
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
    .addField("Account Created:", `${member.user.createdAt.toUTCString()}`, true)
    .addField("Joined at:", `${member.joinedAt.toUTCString()}`, true)
    .setTimestamp(member.joinedTimestamp)

    client.channels.cache.get("935866768424063046").send({embeds: [joinLogsEmbed]})


})