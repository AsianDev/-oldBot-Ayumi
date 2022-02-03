/** @format */

const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js")
const { Collection } = require('discord.js')
const Timeout = new Discord.Collection()
const db = require('../../util/models/command.js');
const ms = require("ms")
const { owners } = require("../../util/Data/config.json");
const config = require("../../util/Data/config.json");
const premiumSchema = require("../../util/models/premium.js")
module.exports = new Event("messageCreate", async (client, message) => {

	if (message.author.bot) return;

	// ---------------------------------------- QUICK FUN STUFF --------------------------------------- //

	if (message.content.toLowerCase() === 'welcome') {
		message.react('<:TomoeWow:913019554538598431>')
		message.react('<a:BearKiss2:912597459337900073>')
	}
	if (message.content.toLowerCase() === 'welc') return message.react('❤️')
	if (message.content.toLowerCase() === 'welcomeee') return message.react('<:TomoeWow:913019554538598431>')
	if (message.content.toLowerCase() === "how are you") return message.channel.send("Hmm im not sure if you asked me but im okay.")
	if (message.content.toLowerCase() === 'welcome!') return message.react('❤️')
	if (message.content === 'F') return message.reply({ content: `<@${message.author.id}> has paid their respect <a:HashiHeart:922084304518004779>`, allowedMentions: { repliedUser: false } })
	if (message.content.toLowerCase() === 'Thanks for joining') return message.react('❤️')
	if (message.content.toLowerCase() === 'ty for joining') return message.react('❤️')
	if (message.content.toLowerCase() === 'fuck') return message.react('💢')

		// ---------------------------------------- EVERYONE PING RESPONSE --------------------------------------- //

	const EVERYONE_PINGEmbed = new Discord.MessageEmbed()
	.setImage('https://media.discordapp.net/attachments/925294763404570624/931140887575150642/image-3.png?width=885&height=498')
	.setColor("#36393f")

	if (message.mentions.everyone) return message.reply({ embeds: [EVERYONE_PINGEmbed], content: "Dont ping everyone smh", allowedMentions: { repliedUser: false } })

		// ---------------------------------------- PING RESPONSE --------------------------------------- //


	const pingedmeresponse = new Discord.MessageEmbed()
	.setTitle("<:Iki_Sakura:897357779956793356> *Waa~* A ping?")
	.setDescription("My 3 prefixes i have current are of: ``Kao ``, ``Kaori `` & ``k.``. \nHere is a list of my command catergories! <:uwu:934418076877881395>")
	.setColor("#FCC8EA")
	.setURL("https://discord.gg/TQ3mTPE7Pf")
	.addField('Catergory', " 🎬 ``Action``\n  😜 ``Fun`` \n 🎁 ``Giveaway``\n 🖼️ ``Image`` \n  <:Iki_info:936545458023698433> ``Information``\n  🛡️ ``Moderation``\n 🗒️ ``Setup``\n <:Links:904222183813947463> ``Support``\n ✅ ``Utility``\n Do **Kao help <catergory**> to show the help catergory.\n\n   **|** [**Discord**](https://discord.gg/TQ3mTPE7Pf)  **|** [**Vote**](https://top.gg/servers/873143392488525834)", false)
	.setFooter({ text: `${client.commands.size} Commands in total • Thanks for the ping <3`, iconURL: `${message.guild.iconURL()}`})

	 if(message.content.replace(/(<@|!|>){1}/g, '') == `${client.user.id}`) return message.reply({embeds: [pingedmeresponse], allowedMentions: {repliedUser: false}})	   

	// ------------------------------------------ PREFIX AND COMMAND CHECKING ---------------------------------- //

	const prefixes = [
		"Kao ",
		"kao ",
		"Kaori ",
		"KAO ",
		"KAORI ",
		"kaori ",
		"K.",
		"k.",
		"k. ",
		"K. ",
		"k,",
		"K,",
		"k, ",
		"K, ",
		`<@$${client.user.id}>`,
        `<@!${client.user.id}>`
	]

		const prefix = prefixes.find(x => message.content.startsWith(x));
		if (!prefix) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = client.commands.find(cmd => cmd.name == args[0].toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args[0].toLowerCase()))
		if (!command) return;

		
		// -------------------------------- OWNER ONLY CHECKING --------------------------------- //

		const ownerOnlyEmbed = new Discord.MessageEmbed()
			.setColor("#FCC8EA")
			.setDescription("*Waa~~* you are not my owner (._.)\nThis commmand is restricted to be my owner's command only.")
			.setTitle("<:x_:904736839036993586> An Error Occured!")
			.setURL("https://discord.gg/TQ3mTPE7Pf")

		if (command) {
			if (command.owner) {
				if (command.owner && !owners.includes(message.author.id))
				return message.channel.send({ embeds: [ownerOnlyEmbed] })
				}

		// ------------------------------ PERMISSION AND COMMAND TYPE CHECKING ----------------------------- //

			const SlashOnlyCMDEMBED = new Discord.MessageEmbed()
				.setColor("#EE3748")
				.setDescription("*Bakaa~* that command can only be done with a slash command! >o<")
				.setTitle(`<:Ikix:904736839036993586> WRONG USAGE!`)

			if (!["BOTH", "TEXT"].includes(command.type))
				return message.reply({ embeds: [SlashOnlyCMDEMBED], allowedMentions: { repliedUser: false }})

			const Userpermission = message.member.permissions.has(command.userPermissions);
			const UserpermEmbed = new Discord.MessageEmbed()
				.setColor("#EE3748")
				.setTitle("<:x_:904736839036993586> MISSING PERMISSIONS")
				.setURL("https://media.discordapp.net/attachments/934515089296486430/935225337774735430/unknown.png?width=991&height=242")
				.setDescription(`You do not have the sufficient permissions: \`\`${command.userPermissions}\`\``)
				.setTimestamp()

			const Botpermission = message.guild.me.permissions.has(command.botPermissions)
			const BotpermEmbed = new Discord.MessageEmbed()
				.setColor("#EE3748")
				.setTitle("<:x_:904736839036993586> MISSING PERMISSIONS")
				.setURL("https://media.discordapp.net/attachments/934515089296486430/935225337774735430/unknown.png?width=991&height=242")
				.setDescription(`I do not have the sufficient permissions: \`\`${command.botPermissions}\`\``)
				.setTimestamp()

			if (!Userpermission)
				return message.channel.send({ embeds: [UserpermEmbed] })
			if (!Botpermission)
				return message.channel.send({ embeds: [BotpermEmbed] })


		// --------------------------- IF PREMIUM USER CHECKING -------------------------------- //

		const UpgradeToPremiumPlease = new Discord.MessageEmbed()
			.setColor("#FBD9F6")
			.setTitle("*Waa~* You do not have access to this command!")
			.setDescription("This command is a **Premium Only** command! Please ugprade to Premium to gain access to this!")
		const UpgradeToPremiumPleaseButton = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setURL("https://top.gg/servers/873143392488525834")
					.setLabel("Vote for Ikigai")
					.setStyle("LINK")
			)
			.addComponents(
				new Discord.MessageButton()
					.setURL("https://media.discordapp.net/attachments/927584143615860736/933831535939960843/ff36ecf38f24c9e448767ad2a9121.png?width=529&height=70")
					.setLabel("Get Premium")
					.setStyle("LINK")
					.setEmoji("936545458023698433")
			)

		if (command.premium && !(await premiumSchema.findOne({ user: message.author.id }))) return message.reply({ embeds: [UpgradeToPremiumPlease], components: [UpgradeToPremiumPleaseButton] })


		// ---------------------------------------- DISABLED COMMANDS ------------------------- //

		if (command) {
			const DisabledCMD = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`**Bakaa~!** ${command} is already disabled in this server!`)
			const check = await db.findOne({ Guild: message.guild.id })
			if (check) {
				if (check.Cmds.includes(command.name)) return message.channel.send({ embeds: [DisabledCMD] })
			}

			// ------------------------------------------- COMMAND COOLDOWNS ----------------------------------- //
			if (command) {
				if (command.cooldown) {
					if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send({
						embeds: [new Discord.MessageEmbed()
							.setColor("#ff3235")
							.setDescription(`⏱️ ┃ <@${message.author.id}> You are on cooldown. Please wait for ${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: false })} `)]
					})
					command.run(message, args, client)
					Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
					setTimeout(() => {
						Timeout.delete(`${command.name}${message.author.id}`)
					}, command.cooldown)
				}
				if (!command.cooldown) {
					command.run(message, args, client)
				}
			}
		}
	}
}) 