const Discord = require("discord.js")
const Event = require('../../Handlers/Event.js')
const welcomerole = require("../../config/models/roleDB");
module.exports = new Event("guildMemberAdd", async (client, member) => { 
  if(member.user.bot) return;
  welcomerole.findOne({
    guild: member.guild.id
}, async (err, data) => {
    if (!data) return;
    if (data) {
        const joinrole = member.guild.roles.cache.find(role => role.id == data.role);
        if (!joinrole) {
            return data.delete();
        }
        member.roles.add(joinrole.id)
    }
  })
})