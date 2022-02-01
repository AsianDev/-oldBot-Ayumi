const Event = require("../../Handlers/Event.js");
const Discord = require('discord.js')

module.exports = new Event("roleDelete", (client, role) => {

    const RoleCreatedEmbed = new Discord.MessageEmbed()
    .setTitle(`Role: **${role.name}** has been deleted`)
    .addField("Role Name:", `**${role.name}**`, true)
    .addField("Role Colour:", `**${role.hexColor.toUpperCase()}**`, true)
    .addField("Display Seperatly?", `${role.hoist ? "True" : "False"}`)
    .setColor("#E6604D")
    .setTimestamp()

    client.channels.cache.get("935866768424063046").send({ embeds: [RoleCreatedEmbed]}) 
})