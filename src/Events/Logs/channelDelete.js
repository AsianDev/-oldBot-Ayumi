const Event = require('../../Handlers/Event.js')
const { MessageEmbed } = require('discord.js')
const DB = require("../../config/models/loggerDB.js")
module.exports = new Event('channelDelete', async (client, channel) =>{
    const Data = await DB.findOne({
        GuildID: channel.guild.id,
    });
    if (!Data || !Data.Logs) return;

    if (channel.type == "DM" || channel.type == "GROUP_DM") return;

    const logsChannel = channel.guild.channels.cache.get(Data.Logs);

    const logs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_DELETE",
    });
    const log = logs.entries.first(); 

    if (log) {
        const channelDeleteEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle(
                `<:icons_deletechannel:952954846665928774> A Channel Has Been Deleted`
            )
            .setTimestamp()
            .setFooter({ text: channel.guild.name })
            .setDescription(
                `> The channel \`${channel.name}\` has been deleted by \`${log.executor.tag}\``
            )
            .addField(
                "Type",
                `\`${channel.type.slice(6).toLowerCase().replaceAll("_", " ")}\``
            );

        if (channel.type !== "GUILD_CATEGORY") {
            
            channelDeleteEmbed.addField(
                "Category",
                channel.parentId ? `\`${channel.parent.name}\`` : "No Catergory"
            );
        }

        logsChannel
            .send({ embeds: [channelDeleteEmbed] })
            .catch((err) => console.log(err));
    }
})