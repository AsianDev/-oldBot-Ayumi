/** @format */

const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const ms = require("ms")
const emotes = require("../../config/assets/Json/emotes.json")
module.exports = new Command({

	name: "ping",
	description: "shows the ping of bot",
	cooldown: 7000,
	aliases: ["botping"],
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
  type: "Text",
	async run(message, args, client) {

		const Pinging = new Discord.MessageEmbed()
        .setColor('#E6604D')
        .setDescription(`🏓 **Pinging...** <a:Iki_loading:938868057890250882>`)
        message.reply({ embeds: [Pinging], allowedMentions: {repliedUser: false} }).then((msg) => {
            setTimeout(() => msg.edit({ embeds: [Pinged] }), ms('2 seconds'))
        })
		let Pinged = new Discord.MessageEmbed()
		.setTitle("🏓Pong!")
		.setColor("#4D9AE6")
		.setDescription(`**Bot Ping:**: ${client.ws.ping}`)
		.setFooter({ text:`Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
	}
})
