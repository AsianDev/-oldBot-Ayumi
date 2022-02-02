const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js");
module.exports = new Event("guildMemberAdd", async (client, member, message) => { 

    const guildConfig = require('../../util/models/guildConfig.js')
    const data = await guildConfig.findOne({guildId: member.guild.id})
    if (!data) return;
    const channel = member.guild.channels.cache.find(c => c.id === data.QuickwelcomeChannel)
    if (!channel) return;
    if (member.user.bot) return;
     channel.send(`<a:HashiHeart:922084304518004779> <@${member.user.id}> Welcome to Ikigai! Go get some roles in <#902021352804978699> and join some clubs in <#911767279526613072> ! <a:Kawaii_Bunny:922261803583553556>`)

})