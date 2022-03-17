const Discord = require("discord.js")
const Event = require('../../../Structures/Handlers/Event.js')
const welcomerole = require("../../Structures/models/welcomerole")

module.exports = new Event("guildMemberAdd", async (client, member)=>{ 
  const data1 = await welcomerole.findOne({ Guild: member.guild.id })
  if(!data1) return;
  const role = member.guild.roles.cache.get(data1.Role)
  if(!role) return;
  if(role){
  member.roles.add(role)
  }})