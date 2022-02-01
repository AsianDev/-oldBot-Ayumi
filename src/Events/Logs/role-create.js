const Event = require("../../Handlers/Event.js");
const Discord = require('discord.js')

module.exports = new Event("roleCreate", (client, role) => {

    const RoleCreatedEmbed = new Discord.MessageEmbed()
    .setTitle(`New Role: **${role.name}** has been created.`)
    .addField("Role Colour:", `**${role.hexColor.toUpperCase()}**`, true)
    .addField("Display Seperatly?", `${role.hoist ? "True" : "False"}`, true)
    .setColor("#90F781")
    .setTimestamp()

    client.channels.cache.get("935866768424063046").send({ embeds: [RoleCreatedEmbed]}) 
})