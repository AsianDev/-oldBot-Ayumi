const Event = require('../../Handlers/Event.js')
const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const DB = require("../../config/models/loggerDB.js")
module.exports = new Event("roleDelete", async(client, role) => {

    const Data = await DB.findOne({
        GuildID: role.guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = role.guild.channels.cache.get(Data.Logs);
    const logs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_DELETE",
    });
    const log = logs.entries.first(); 

    const roleCreateEmbed = new MessageEmbed()
        .setTitle(
            "<:icons_deleterole:866943415895851018> A Role Has Been Deleted"
        )
        .setColor("RED")
        .setTimestamp()
        .setFooter({ text
: role.guild.name });

    if (log) {
        roleCreateEmbed.setDescription(
            `> The role \`${role.name}\` has been deleted by \`${log.executor.tag}\``
        );
        logsChannel
            .send({ embeds: [roleCreateEmbed] })
            .catch((err) => console.log(err));
    }
})