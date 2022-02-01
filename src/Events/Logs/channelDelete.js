const Discord = require("discord.js")
const Event = require("../../Handlers/Event.js");
module.exports = new Event("channelDelete", async (client, channel) =>{
  const DeletedChannelEmbed = new Discord.MessageEmbed()
  .setTitle(`Updates to: ${channel.name}`)
  .setDescription(`**Channel name:** ${channel.name}`)
  .addField("**Channel type**", `${channel.type}`)
  .addField("NSFW:", `${channel.nsfw ? 'True' : 'False'}`, true)
  .setColor("#E6604D")
  client.channels.cache.get("927861780900872192").send({embeds: [DeletedChannelEmbed]})}) 