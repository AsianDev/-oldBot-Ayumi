const Event = require("../../Handlers/Event.js");
const Discord = require('discord.js')

module.exports = new Event("guildMemberUpdate", async(client, oldMember, newMember) => {
    
    const guildConfig = require('../../util/models/guildConfig.js')
    const data = guildConfig.findOne({guildId: newMember.guild.id})
    if (!data) return
    const channel = newMember.guild.channels.cache.find(c => c.id === data.BoostChannel)
    if (!channel) return;
	if (oldMember.premiumSinceTimestamp === 0 && newMember.premiumSinceTimestamp > 0) {
        const boostembed = new Discord.MessageEmbed()
        .setTitle(`<a:Nitro_Jem:917401694726398002> ${newMember.user.tag}`)
        .setDescription(`Thanks for the boost <a:Nitro:892882975774097498>! We are now at ${message.guild.premiumSubscriptionCount} boosts!`)
        .setThumbnail(`${newMember.user.displayAvatarURL({ dynamic: true })}`)
        .setColor("#FEE4FA")
        channel.send({embeds: [boostembed]})}})