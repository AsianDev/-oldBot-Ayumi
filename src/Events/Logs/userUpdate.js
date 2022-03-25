const Event = require('../../Handlers/Event.js')
const { MessageEmbed, User, UserFlags } = require("discord.js");
const DB = require("../../config/models/loggerDB.js")
module.exports = new Event("roleCreate", 
/**
	 * @param {User} oldUser
	 * @param {User} newUser
	 */
async(client, oldUser, newUser) => {
    const guild = client.guilds.cache.get("873143392488525834");

    const Data = await DB.findOne({
        GuildID: guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = guild.channels.cache.get(Data.Logs);

    const userUpdateEmbed = new MessageEmbed()
        .setColor("ORANGE")
        .setTitle(
            `<:icons_updatemember:949375652291809341> A User Has Been Updated`
        )
        .setTimestamp()
        .setFooter({ text
: guild.name });

    if (oldUser.username !== newUser.username) {
        userUpdateEmbed
            .setDescription(`The user ${newUser} changed their username`)
            .addFields(
                {
                    name: "Old username",
                    value: `\`${oldUser.username}\``,
                },
                {
                    name: "New username",
                    value: `\`${newUser.username}\``,
                }
            );
        logsChannel
            .send({ embeds: [userUpdateEmbed] })
            .catch((err) => console.log(err));
    }

    if (oldUser.discriminator !== newUser.discriminator) {
        userUpdateEmbed
            .setDescription(`The user ${newUser} changed their discriminator`)
            .addFields(
                {
                    name: "Old discriminator",
                    value: `\`${oldUser.discriminator}\``,
                },
                {
                    name: "New discriminator",
                    value: `\`${newUser.discriminator}\``,
                }
            );
        logsChannel
            .send({ embeds: [userUpdateEmbed] })
            .catch((err) => console.log(err));
    }

    if (oldUser.banner !== newUser.banner) {
        userUpdateEmbed
            .setDescription(`The user ${newUser} changed their banner`)
            .setImage(newUser.bannerURL({ dynamic: true }))
            .addFields(
                {
                    name: "Old banner",
                    value: oldUser.banner
                        ? `${oldUser.bannerURL({ dynamic: true })}`
                        : "No banner before",
                },
                {
                    name: "New banner",
                    value: newUser.banner
                        ? `${newUser.bannerURL({ dynamic: true })}`
                        : "No new banner",
                }
            );
        logsChannel
            .send({ embeds: [userUpdateEmbed] })
            .catch((err) => console.log(err));
    }

    if (oldUser.avatar !== newUser.avatar) {
        userUpdateEmbed
            .setDescription(`The user ${newUser} changed their avatar`)
            .setImage(newUser.avatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "Old avatar",
                    value: oldUser.avatar
                        ? `${oldUser.avatarURL({ dynamic: true })}`
                        : "No avatar before",
                },
                {
                    name: "New avatar",
                    value: newUser.avatar
                        ? `${newUser.avatarURL({ dynamic: true })}`
                        : "No new avatar",
                }
            );
        logsChannel
            .send({ embeds: [userUpdateEmbed] })
            .catch((err) => console.log(err));
    }

    if (!oldUser.flags || !newUser.flags) return;
    if (oldUser.flags != newUser.flags) {
        const newFlags = new UserFlags(
            oldUser.flags.missing(newUser.flags.bitfield, false)
        ).toArray();
        const oldFlags = new UserFlags(
            newUser.flags.missing(oldUser.flags.bitfield, false)
        ).toArray();

        if (newFlags.length < 1 && oldFlags.length < 1) return;
        userUpdateEmbed.setDescription(`The user ${newUser} changed their flags`);

        if (newFlags.length > 0) {
            const addedPerms = d
                .slice(" ")
                .map((e) => `\`${e}\``)
                .join(" ")
                .toLowerCase()
                .replaceAll("_", " ");
            userUpdateEmbed.addField("**Added Permission**", addedPerms);

            logsChannel
                .send({ embeds: [userUpdateEmbed] })
                .catch((err) => console.log(err));
        }

        if (oldFlags.length > 0) {
            const removedPerms = s
                .slice(" ")
                .map((e) => `\`${e}\``)
                .join(" ")
                .toLowerCase()
                .replaceAll("_", " ");
            userUpdateEmbed.addField("**Removed Permission**", removedPerms);

            logsChannel
                .send({ embeds: [userUpdateEmbed] })
                .catch((err) => console.log(err));
        }
    }     
})