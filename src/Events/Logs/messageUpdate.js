const Event = require('../../Structures/Handlers/Event.js')
const { MessageEmbed } = require('discord.js')
const DB = require("../../Structures/models/loggerDB.js")
module.exports = new Event('messageUpdate', async (client, oldMessage, newMessage) =>{
    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const Data = await DB.findOne({
        GuildID: newMessage.guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = newMessage.guild.channels.cache.get(Data.Logs);

    const Original =
        oldMessage.content.slice(0, 1000) +
        (oldMessage.content.length > 1000 ? " ..." : "");

    const Edited =
        newMessage.content.slice(0, 1000) +
        (newMessage.content.length > 1000 ? " ..." : "");

    const Log = new MessageEmbed()
        .setColor("RED")
        .setTitle("A Message Has Been Updated")
        .setDescription(
            `📘 A [message](${newMessage.url}) by ${newMessage.author} was **updated** in ${newMessage.channel}.`
        )
        .addFields(
            {
                name: "Original",
                value: Original,
            },
            {
                name: "Edited",
                value: Edited,
            }
        )
        .setFooter({
            text: `Member: ${newMessage.author.tag} | Member: ${newMessage.author.id}`,
            iconURL: `${newMessage.author.avatarURL({ dynamic: true, size: 512 })}`,
        });

    logsChannel.send({ embeds: [Log] }).catch((err) => console.log(err));

})