/** @format */

const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js")
const { Collection } = require('discord.js')
const Timeout = new Discord.Collection()
const ms = require("ms")
const { owners } = require("../../config/Data/config.json");
const premiumSchema = require("../../config/models/premium.js")
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const Kaori = require("../../config/assets/Json/kaori's.json")
const randomKaori = Kaori.arts[Math.floor((Math.random() * Kaori.arts.length))];

module.exports = new Event("messageCreate", async (client, message) => {

	if (message.author.bot) return;
	
		// ------------------------------------------ DM LOGGIN ---------------------------------- //

	if(message.channel.type === "DM"){
		let loggingDM = new Discord.MessageEmbed()
		.setColor(colour["celestial blue"])
		.setThumbnail(`${message.author.displayAvatarURL()}`)
		.setTitle(`A User has dm'ed ${client.user.tag}`)
		.addField("Message:", `${message.content}`)
		.addField("Author:", `${message.author.tag}`)
		client.channels.cache.get("932285249205960764").send({ embeds: [loggingDM] });
	  }

	  	// ---------------------------------------- QUICK FUN STUFF --------------------------------------- //

	if (message.content === 'welcome!') return message.react("<a:Kao_mochaDance:948192364864868362>")
	if (message.content === 'welc') return message.react('❤️')
	if (message.content === 'welcomeee') return message.react('<:Kao_TomoeStare:617939107066282024>')
	if (message.content.toLowerCase() == 'welcome') return message.react("<a:Kao_mochaDance:948192364864868362>")
	if (message.content === 'Thanks for joining') return message.react('❤️')
	if (message.content === 'ty for joining') return message.react('❤️')
	if (message.content === 'fuck') return message.react('💢')
	  if(message.content.toLowerCase() === "i should boost the server") return message.reply({content: "*Waa~* would you really do that for us?!", allowedMentions: {repliedUser: false}})

	  	// ---------------------------------------- EVERYONE PING RESPONSE --------------------------------------- //

	const EVERYONE_PINGEmbed = new Discord.MessageEmbed()
	.setImage('https://media.discordapp.net/attachments/925294763404570624/931140887575150642/image-3.png?width=885&height=498')
	.setColor("#36393f")

	if (message.mentions.everyone) return message.reply({ embeds: [EVERYONE_PINGEmbed], content: "Dont ping everyone smh", allowedMentions: { repliedUser: false } })

	// ------------------------------------------ PREFIX AND COMMAND CHECKING ---------------------------------- //

	const prefixes = [
		"Kao ",
		"kao ",
		"Kaori ",
		"KAO ",
		"KAORI ",
		"kaori ",
		"kao",
		"Kao",
		"KaO ",
		"kAo ",
		"cao",
		"Cao",
		"Kai",
		"kai",
		"kaoree",
		"K.",
		"k.",
		"k. ",
		"K. ",
		"k,",
		"K,",
		"k, ",
		"K, ",
		`<@$${client.user.id}>`,
        `<@!${client.user.id}>`,
		`${client.user.id}`,
		
	]

		const prefix = prefixes.find(x => message.content.startsWith(x))
		if (!prefix) return;

		function generateRandomString(length) {
			var chars =
			  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()|/.@#!$%^&+><?;:~*=";
			var random_string = "";
			if (length > 0) {
			  for (var i = 0; i < length; i++) {
				random_string += chars.charAt(
				  Math.floor(Math.random() * chars.length)
				);
			  }
			}
			return random_string;
		  }
		  
		  const id = generateRandomString(5);           
		  IDNumber = `${id}`;
	
	
		const kaoriFanArt = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setImage(`${randomKaori.image}`)
		.setFooter({ text: `Artist: ${randomKaori.author}`})
		.setDescription(`Name: **${randomKaori.name}**\nID: **[${IDNumber}](${randomKaori.image})**`)
	
		if(message.content === prefix) {
			 message.channel.send({embeds: [kaoriFanArt]})
			 return;
			}

		const args = message.content.slice(prefix.length).trim().split(/ +/g)
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

				if(command) {
					if(command.maintance) {
						if(command.maintance && !owners.includes(message.author.id))
						return message.channel.send({embeds: [new Discord.MessageEmbed()
							.setColor(colour.pink)
							.setTitle(`${emotes.Error} Sorry this command is currently going under maintance`)
							.setDescription("Due to some difficulties this command is disabled!")
							.setURL("https://discord.gg/TQ3mTPE7Pf")
						]})
					}
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
					.setEmoji("<:Iki_tick:904736864076955738>")
			)

		if (command.premium && !(await premiumSchema.findOne({ user: message.author.id }))) return message.reply({ embeds: [UpgradeToPremiumPlease], components: [UpgradeToPremiumPleaseButton] })

				// ---------------------------------------- NSFW CHECKING ------------------------- //
				const NSFW = new Discord.MessageEmbed()
				.setColor(colour['light red'])
				.setTitle(`${emotes.Error} THIS IS NOT AN NSFW CHANNEL`)
				.setDescription("Please run this command in an NSFW Channel")

				if (command) {
					if (!message.channel.nsfw) {
						if (command.nsfw) {
						message.react("<:Iki_MAD:874174682427969536>");
						return message.reply({ embeds: [NSFW], allowedMentions: {repliedUser: false} }).then((msg) => {
							setTimeout(() => msg.delete(), 3000);
						  });
						}
					}

							// ---------------------------------------- Ikigai server only COMMANDS ------------------------- //


						const kaoriServerID = client.guilds.cache.get(" ") // Ikigai server id <- put here >:)

					const KaoriServerOnly = new Discord.MessageEmbed()
					.setColor(colour.pink)
					.setTitle(`${emotes.Error} AN ERROR OCCURED`)
					.setDescription("*Waa~* Sorry! This command is only available to use in the main server!")
					.setThumbnail(client.user.displayAvatarURL())
					.setFooter({ text: "Join the main server to use this command! "})
					.addField("Ikigai server (main server)", "**[Join here!](https://discord.gg/TQ3mTPE7Pf)**")

					if(command) {
						if(message.guild.id !== "") {
						if(command.guildOnly) {
							message.reply({embeds: [KaoriServerOnly], allowedMentions: {repliedUser: false}}).then((msg) => {
								setTimeout(() => msg.delete(), 3000);
							  });
						}
						}
					}

		// ---------------------------------------- DISABLED COMMANDS ------------------------- //
		const commandDb = require('../../config/models/command.js');
		if (command) {
			const DisabledCMD = new Discord.MessageEmbed()
				.setColor(colour["celestial blue"])
				.setTitle(`${emotes.Error} *Waa~* AN ERROR OCCURED!`)
				.setDescription(`*Bakaa~* This command is disabled in this server!`)
				.addField("Command Name:", `${command.name}`)
				.addField("Command Description:", `${command.description}`)

			const check = await commandDb.findOne({ Guild: message.guild.id })
			if (check) {
				if (check.Cmds.includes(command.name)) return message.channel.send({ embeds: [DisabledCMD] })
			}

			// ------------------------------------------- COMMAND COOLDOWNS ----------------------------------- //
			if (command) {
				if (command.cooldown) {
					if (Timeout.has(`${command.name}${message.author.id}`)) return message.reply({
						embeds: [new Discord.MessageEmbed()
							.setColor("#ff3235")
							.setDescription(`***Waa~* you need to wait!** (；⌣̀_⌣́)	\n You need to wait for ${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: false })} to use __${command.name}__ again.\n The Default cooldown for __${command.name}__ is ${ms(`${command.cooldown}`),{ long: false}}`)
						], allowedMentions: {repliedUser: false}
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
		}}
		}
	}) 