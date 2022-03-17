const Event = require('../../Structures/Handlers/Event.js')
const { MessageEmbed, Message, Client } = require("discord.js");
const DB = require("../../Structures/models/loggerDB.js")
module.exports = new Event('messageDeleteBulk', 

async (client, message) =>{

    if (message.author.bot) return;
		const Data = await DB.findOne({
			GuildID: message.guild.id,
		});
		if (!Data || !Data.Logs) return;

		const logsChannel = message.guild.channels.cache.get(Data.Logs);
		const logs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_DELETE",
		});
		const log = logs.entries.first(); 
		if (!log)
			return console.log(
				`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`
			);

		const messageContent =
			message.content.slice(0, 1000) +
			(message.content.length > 1000 ? " ..." : "");

		const { executor, target } = log;

		const messageDeletedEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("A Message Has Been Deleted")
			.setTimestamp()
			.addField("Message", messageContent)
			.setFooter({
				text: `Member: ${message.author.tag} | ID: ${message.author.id}`,
				iconURL: `${message.author.avatarURL({ dynamic: true, size: 512 })}`,
			});
		if (target.id === message.author.id) {
			messageDeletedEmbed.setDescription(
				`📘 A message by ${message.author} in ${message.channel} was **deleted** by <@${executor.id}>.`
			);
		} else {
			messageDeletedEmbed.setDescription(
				`📘 A message by ${message.author} in ${message.channel} was **deleted**, audit log fetch was inconclusive.`
			);
		}

		logsChannel
			.send({ embeds: [messageDeletedEmbed] })
			.catch((err) => console.log(err));
})