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
    });
    const log = logs.entries.first(); 

    const channelPinsChangeEmbed = new MessageEmbed()
        .setTitle(
            "<:icons_updatemember:949375652291809341> A Channel's Pins Has Been Updated"
        )
        .setTimestamp()
        .setFooter({ text
: channel.guild.name });

    if (!log.target) return;

    if (log.action == "MESSAGE_PIN") {
        channelPinsChangeEmbed
            .setColor("GREEN")
            .setDescription(
                `> A message by \`${log.target.tag}\` has been pinned in ${channel} by \`${log.executor.tag}\``
            );
    }

    if (log.action == "MESSAGE_UNPIN") {
        channelPinsChangeEmbed
            .setColor("RED")
            .setDescription(
                `> A message by \`${log.target.tag}\` has been unpinned from ${channel} by \`${log.executor.tag}\``
            );
    }

    logsChannel
        .send({ embeds: [channelPinsChangeEmbed] })
        .catch((err) => console.log(err));
})