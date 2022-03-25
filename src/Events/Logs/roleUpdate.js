const Event = require('../../Handlers/Event.js')
const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const DB = require("../../config/models/loggerDB.js")
module.exports = new Event('roleUpdate', async(client, oldRole, newRole) => {
    const Data = await DB.findOne({
        GuildID: oldRole.guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = oldRole.guild.channels.cache.get(Data.Logs);
    const logs = await oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE",
    });
    const log = logs.entries.first();

    const roleUpdateEmbed = new MessageEmbed()
        .setTitle(
            "<:icons_updaterole:949338507447517266> A Role Has Been Updated"
        )
        .setColor("ORANGE")
        .setTimestamp()
        .setFooter({ text
: oldRole.guild.name });

    if (log) {
        if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
            const p =
                new Permissions(newRole.permissions.bitfield)
                    .toArray()
                    .slice(" ")
                    .map((e) => `\`${e}\``)
                    .join(" ")
                    .toLowerCase()
                    .replaceAll("_", " ") || "None";

            roleUpdateEmbed
                .setDescription(
                    `> The permissions of ${newRole} has been changed by \`${log.executor.tag}\``
                )
                .addField("New permissions", p);
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        }

        if (oldRole.name !== newRole.name) {
            roleUpdateEmbed
                .setDescription(
                    `> The name of ${newRole} has been updated by \`${log.executor.tag}\``
                )
                .addFields(
                    {
                        name: "Old name",
                        value: `\`${oldRole.name}\``,
                    },
                    {
                        name: "New name",
                        value: `\`${newRole.name}\``,
                    }
                );
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        }

        if (oldRole.color !== newRole.color) {
            roleUpdateEmbed
                .setDescription(
                    `> The color of ${newRole} has been updated by \`${log.executor.tag}\``
                )
                .addFields(
                    {
                        name: "Old color",
                        value: `\`${oldRole.color}\``,
                    },
                    {
                        name: "New color",
                        value: `\`${newRole.color}\``,
                    }
                );
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        }

        if (oldRole.icon !== newRole.icon) {
            roleUpdateEmbed
                .setDescription(
                    `> The icon of ${newRole} has been changed by \`${log.executor.tag}\``
                )
                .setImage(newRole.iconURL())
                .addFields(
                    {
                        name: "Old icon",
                        value: oldRole.icon ? `${oldRole.iconURL()}` : "No icon before",
                    },
                    {
                        name: "New icon",
                        value: newRole.icon ? `${newRole.iconURL()}` : "No new icon",
                    }
                );
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        }

        if (!oldRole.hoist && newRole.hoist) {
            roleUpdateEmbed.setDescription(`> The role ${newRole} is now hoist`);
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        } else if (oldRole.hoist && !newRole.hoist) {
            roleUpdateEmbed.setDescription(
                `> The role ${newRole} is not hoist anymore`
            );
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        }

        if (!oldRole.mentionable && newRole.mentionable) {
            roleUpdateEmbed.setDescription(
                `> The role ${newRole} is now mentionable`
            );
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        } else if (oldRole.mentionable && !newRole.mentionable) {
            roleUpdateEmbed.setDescription(
                `> The role ${newRole} is not mentionable anymore`
            );
            logsChannel
                .send({ embeds: [roleUpdateEmbed] })
                .catch((err) => console.log(err));
        }
    }
})