const Discord = require("discord.js")
const Event = require("../../Handlers/Event.js");
module.exports = new Event("channelPinsUpdate", async (client, channel) =>{

	if (!channel.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
	const audits = await channel.guild.fetchAuditLogs({
		limit: 1
	}).catch(() => null);

	if (!audits) return;
	const audit = audits.entries.filter(en => ['MESSAGE_PIN', 'MESSAGE_UNPIN'].includes(en.action)).first();
	if (!audit) return;

	const embed = new Discord.MessageEmbed()
		.setColor("#90F781")
		.setDescription(`[**Click here -> Message ${audit.actionType === 'DELETE' ? 'Unpinned' : 'Pinned' }**](https://discordapp.com/channels/${channel.guild.id}/${channel.id}/${audit.extra.messageID})`)
		.addField("> Message Pinned by:\n", `${audit.executor.tag}`,)
		client.channels.cache.get("927861780900872192").send({embeds: [embed]})})
