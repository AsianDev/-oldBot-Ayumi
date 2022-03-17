const Event = require('../../Structures/Handlers/Event.js')
const { MessageEmbed } = require('discord.js')
const DB = require("../../Structures/models/loggerDB.js")
module.exports = new Event('guildMemberUpdate', async (client, oldMember, newMember) =>{
    const Data = await DB.findOne({
        GuildID: oldMember.guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = oldMember.guild.channels.cache.get(Data.Logs);
    const logs = await oldMember.guild.fetchAuditLogs({
        limit: 1,
    });
    const log = logs.entries.first(); 

    if (log.action == "MEMBER_ROLE_UPDATE") {
        if (oldMember.roles.cache.size == newMember.roles.cache.size) return; 
        const memberRoleUpdateEmbed = new MessageEmbed()
            .setTitle(
                "<:icons_updatemember:949375652291809341> One Or Multiple Roles Have Been Added/Removed To A Member"
            )
            .setDescription(
                `> Following roles have been added/removed to ${oldMember} by \`${log.executor.tag}\``
            )
            .setTimestamp()
            .setFooter({ text: newMember.guild.name });

        if (oldMember.roles.cache.size > newMember.roles.cache.size) {
            const p = log.changes
                .find((x) => x.key == "$remove")
                .new.map((e) => `<@&${e.id}>`)
                .join(" "); 
            memberRoleUpdateEmbed.addField("Removed role(s) 📛", p).setColor("RED");
        }
        if (oldMember.roles.cache.size < newMember.roles.cache.size) {
            const p = log.changes
                .find((x) => x.key == "$add")
                .new.map((e) => `<@&${e.id}>`)
                .join(" "); 
            memberRoleUpdateEmbed.addField("Added role(s) ✅", p).setColor("GREEN");
        }
        logsChannel
            .send({ embeds: [memberRoleUpdateEmbed] })
            .catch((err) => console.log(err));
    } else if (log.action == "MEMBER_UPDATE") {
        const memberUpdateEmbed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle(
                "<:icons_updatemember:949375652291809341> A Member Has Been Updated"
            )
            .setTimestamp()
            .setFooter({ text: newMember.guild.name });

        if (oldMember.nickname !== newMember.nickname) {
            memberUpdateEmbed
                .setDescription(
                    `> ${oldMember}'s nickname has been updated by \`${log.executor.tag}\``
                )
                .addFields(
                    {
                        name: "Old nickname",
                        value: oldMember.nickname
                            ? `\`${oldMember.nickname}\``
                            : "No nickname before",
                    },
                    {
                        name: "New nickname",
                        value: newMember.nickname
                            ? `\`${newMember.nickname}\``
                            : "No new nickname",
                    }
                );
            logsChannel
                .send({ embeds: [memberUpdateEmbed] })
                .catch((err) => console.log(err));
        }
        if (!oldMember.premiumSince && newMember.premiumSince) {
            memberUpdateEmbed.setDescription(
                `> ${oldMember} started boosting this server`
            );
            logsChannel
                .send({ embeds: [memberUpdateEmbed] })
                .catch((err) => console.log(err));
        }
    } else {
        const memberUpdateEmbed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle(
                "<:icons_updatemember:949375652291809341> A Member Has Been Updated"
            )
            .setTimestamp()
            .setFooter({ text: oldMember.guild.name });

        if (oldMember.avatar != newMember.avatar) {
            memberUpdateEmbed
                .setDescription(`> ${oldMember}'s avatar has been updated`)
                .setImage(newMember.avatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: "Old avatar",
                        value: oldMember.avatar
                            ? `${oldMember.avatarURL({ dynamic: true })}`
                            : "No server avatar before",
                    },
                    {
                        name: "New avatar",
                        value: newMember.avatar
                            ? `${newMember.avatarURL({ dynamic: true })}`
                            : "No new server avatar",
                    }
                );
            logsChannel
                .send({ embeds: [memberUpdateEmbed] })
                .catch((err) => console.log(err));
        }
    }
}
)