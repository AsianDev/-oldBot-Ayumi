const Event = require("../../Handlers/Event.js");
const Discord = require('discord.js')

module.exports = new Event('roleUpdate', (client, oldRole, newRole) => {

    const RoleUpdatedEmbed = new Discord.MessageEmbed()
    // before
    .setTitle(`Changed to role: **${oldRole.name}**`)
      .setDescription("**Before Update:**")
      .addField("Role Name:", `**${oldRole.name}**`, true)
      .addField("Role Colour:", `**${oldRole.hexColor.toUpperCase()}**`, true)
      .addField("Display Seperatly?", `${oldRole.hoist ? "True" : "False"}`)
      // after
      const RoleUpdatedEmbed2 = new Discord.MessageEmbed()
      .setDescription("**After Update:**")
      .addField("Role Name:", `**${newRole.name}**`, true)
      .addField("Role Colour:", `**${newRole.hexColor.toUpperCase()}**`, true)
      .addField("Display Seperatly?", `${newRole.hoist ? "True" : "False"}`)
      .setColor('#4D9AE6')
      .setTimestamp()
      client.channels.cache.get("935866768424063046").send({ embeds: [RoleUpdatedEmbed, RoleUpdatedEmbed2]}) 
    });
  