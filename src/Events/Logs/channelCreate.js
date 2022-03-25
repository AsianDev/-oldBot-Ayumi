const Event = require('../../Handlers/Event.js')
const { MessageEmbed } = require('discord.js')
const DB = require("../../config/models/loggerDB.js")
module.exports = new Event('channelCreate', async (client, channel) =>{

    const Data = await DB.findOne({
        GuildID: channel.guild.id,
    });
    if (!Data || !Data.Logs) return;
    if (channel.type == "DM" || channel.type == "GROUP_DM") return;

		const logsChannel = channel.guild.channels.cache.get(Data.Logs); // Enter your log channel ID

		const logs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: "CHANNEL_CREATE",
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry of type "CHANNEL_CREATE"

		if (log) {
			// If log exists executes code and creates embed
			const channelCreateEmbed = new MessageEmbed()
				.setColor("GREEN")
				.setTitle(
					`<:icons_createchannel:952952678172991578> A Channel Has Been Created`
				)
				.setTimestamp()
				.setFooter({ text
: channel.guild.name })
				.setDescription(
					`> The channel ${channel} has been created by \`${log.executor.tag}\``
				)
				.addField(
					"Type",
					`\`${channel.type.slice(6).toLowerCase().replaceAll("_", " ")}\``
				);

			if (channel.type !== "GUILD_CATEGORY") {
				// If type is different than category adds the parent
				channelCreateEmbed.addField(
					"Parent category",
					channel.parentId ? `\`${channel.parent.name}\`` : "No parent channel"
				);
			}

			logsChannel
				.send({ embeds: [channelCreateEmbed] })
				.catch((err) => console.log(err));
		}
})
