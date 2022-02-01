const Discord = require("discord.js")
const Event = require("../../Handlers/Event.js");
module.exports = new Event("channelCreate", async (client, channel) =>{
  const CreatedChannelEmbed = new Discord.MessageEmbed()
  .setTitle(`Updates to: ${channel.name}`)
  .setDescription(`**Channel name:** ${channel.name}`)
  .addField("**Channel type**", `${channel.type}`, true)
  .addField("NSFW:", `${channel.nsfw ? 'True' : 'False'}`, true)
  .setColor("#90F781")
  client.channels.cache.get("927861780900872192").send({embeds: [CreatedChannelEmbed]})}) 