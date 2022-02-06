const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js");
const colour = require("../../config/assets/Json/colours.json")
module.exports = new Event("guildMemberRemove", async (client, member, message) => { 

    const joinLogsEmbed = new Discord.MessageEmbed()
    .setColor(`${colour["light red"]}`)
    .setAuthor({ name: `${member.user.tag}`,iconURL: `${member.user.displayAvatarURL()}`})
    .setTitle("User has left Ikigai")
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
    .addField("Joined at:", `${member.joinedAt.toUTCString()}`)
    .setTimestamp(member.joinedTimestamp)

    client.channels.cache.get("935866768424063046").send({embeds: [joinLogsEmbed]})

})