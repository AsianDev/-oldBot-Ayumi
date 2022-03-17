const Event = require('../../Structures/Handlers/Event.js')
const { MessageEmbed, Message, Client } = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");
const DB = require("../../Structures/models/loggerDB.js")

module.exports = new Event('messageDeleteBulk', 
	/**
	 * @param {Message} messages
	 */
async (client, messages) =>{

    const Data = await DB.findOne({
        GuildID: messages.first().guild.id,
    });
    if (!Data || !Data.Logs) return;

    const logsChannel = messages
        .first()
        .guild.channels.cache.get(Data.Logs);
    const logs = await messages.first().guild.fetchAuditLogs({
        limit: 1,
    });
    const log = logs.entries.first(); 
    const tooMuch = messages.size;
    const message = await messages.map((m) => m);
    const channel = messages.first().channel;
    const ID = Math.floor(Math.random() * 5485444) + 4000000;

    try {
        const attachment = await discordTranscripts.generateFromMessages(
            message,
            channel,
            {
                returnBuffer: false,
                fileName: `transcript-${ID}.html`,
            }
        );

        const messageDeletedBulkEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`Multiple Messages Were Deleted`)
            .setDescription(
                `📘 ${tooMuch} messages in <#${
                    messages.first().channelId
                }> was **deleted** by <@${log.executor.id}>.`
            )
            .setTimestamp()
            .setFooter({
                text: messages.first().guild.name,
            });

        logsChannel
            .send({ embeds: [messageDeletedBulkEmbed], files: [attachment] })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
})