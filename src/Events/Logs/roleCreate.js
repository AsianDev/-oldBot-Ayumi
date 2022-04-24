const Event = require('../../Handlers/Event.js')
const { MessageEmbed } = require('discord.js')
const DB = require("../../config/models/loggerDB.js")
module.exports = new Event("roleCreate", async(client, role) => {
    const Data = await DB.findOne({
        GuildID: role.guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = role.guild.channels.cache.get(Data.Logs);
    const logs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_CREATE",
    });
    const log = logs.entries.first();

    const roleCreateEmbed = new MessageEmbed()
        .setTitle(
            "<:icons_createrole:866943415774478388> A Role Has Been Created"
        )
        .setColor("GREEN")
        .setTimestamp()
        .setFooter({ text: role.guild.name });

    if (log) {
        roleCreateEmbed
            .setDescription(
                `> The role \`${role.name}\` has been created by \`${log.executor.tag}\``
            )
            .addFields(
                {
                    name: "Color",
                    value: `\`${role.color}\``,
                    inline: true,
                },
                {
                    name: "Hoisted",
                    value: role.hoist ? "`Yes`" : "`No`",
                    inline: true,
                },
                {
                    name: "Mentionable",
                    value: role.mentionable ? "`Yes`" : "`No`",
                    inline: true,
                },
                {
                    name: "Position",
                    value: `\`${role.position - 1}\``,
                    inline: true,
                }
            );

        if (role.permissions.bitfield) {
            const p =
                new Permissions(role.permissions.bitfield)
                    .toArray()
                    .slice(" ")
                    .map((e) => `\`${e}\``)
                    .join(" ")
                    .toLowerCase()
                    .replaceAll("_", " ") || "None";

            roleCreateEmbed.addField("Permissions", p);
        }

        logsChannel
            .send({ embeds: [roleCreateEmbed] })
            .catch((err) => console.log(err));
    }

})