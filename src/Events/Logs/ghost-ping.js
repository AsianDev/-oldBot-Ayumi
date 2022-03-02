const Event = require('../../Handlers/Event.js');
const Discord = require('discord.js')
let c = require("../../config/assets/Json/colours.json")
const schema = require("../../config/models/ping")
module.exports = new Event(
"messageDelete",
(client, message ) => {
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    if (message.member.permissions.has("MANAGE_GUILD") || message.member.permissions.has("ADMINISTRATOR")) {
        return;
    } else {
    let member = message.mentions.members.first() 
      if (member.id === message.author.id) {
        return; 
    } else { 
          message.channel.send({embeds: [new Discord.MessageEmbed()
        .setColor(c['pale red'])
        .setDescription("*Waa~* Someone did a ghost ping 👀")
        .addField("Pinger", `${message.author}`)
        .addField("Content:", `${message.cleanContent.toString()}`)
        ]})
       }}
    }
    )})
