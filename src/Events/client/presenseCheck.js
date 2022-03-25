const Event = require('../../Handlers/Event.js');
const Discord = require('discord.js')
module.exports = new Event(
'presenceUpdate',
(client, oldPresence, newPresence) => {

    const GuildID = "873143392488525834"
    if(newPresence.guild.id !== GuildID) return;
    const role = newPresence.guild.roles.cache.find(role => role.id == "916874667732639804")
    if (!role) {
        return;
    }
    if(newPresence.activities[0]?.type === "CUSTOM"){
        if(newPresence.activities[0]?.state == "Join Ikigai!"){
           newPresence.member.roles.add(role.id)
        }  else { newPresence.member.roles.remove(role.id) }
   } else { newPresence.member.roles.remove(role.id) }
})
