const Discord = require("discord.js")
const Event = require('../../Structures/Handlers/Event.js')

module.exports = new Event("inviteCreate", async (client, invite) =>{

	if (invite.guild.me.permissionsIn(invite.channel).has("CREATE_INSTANT_INVITE" || "ADMINISTRATOR")) {
	    invite.channel.createInvite({ maxAge: 0, maxUses: 0 }).then(i => { 
            if(invite.inviter.bot) return;
                    const emlink = new Discord.MessageEmbed()
					.setColor("YELLOW")
					.setTitle(`Invite for <#${invite.channel.id}> has been made.`)
                    .addFields({ name: 'Server Name:', value: `\`${invite.guild.name}\``})
					.addField("Invite link", `${i}`)
                    .addField("Channel:", `<#${invite.channel.id}>`)
                    .addField("Inviter:", `<@${invite.inviter.id}>`)
					.setTimestamp()
                    client.channels.cache.get("926718580148559872").send({embeds: [emlink]})
      })}})