const Event = require('../../Handlers/Event.js')
const { EveryoneRoleId, StaffRoleId, StaffRoleId2, CatergoryID, TrasnscriptID  } = require("../../config/assets/Json/ticket.json")
const Discord = require("discord.js")
const colour = require("../../config/assets/Json/colours.json")
const { createTranscript } = require("discord-html-transcripts")
const Timeout = new Discord.Collection()
const ms = require("ms")
const { owners } = require("../../config/Data/config.json");

module.exports = new Event("interactionCreate", async(client, interaction) => {
    if(interaction.guildId == null) return interaction.reply({ content: "You can´t execute commands in DM", ephemeral: true});

    if (interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured O><O", ephemeral: true});
        await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : false }).catch(() => {});
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value)}
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        if (!interaction.member.permissions.has(cmd.userPermissions || []))
            return interaction.followUp({ content: `*Baakaa* you dont have the permission: \`${command.permission}\` to run this command...`, ephemeral: true });
        cmd.run(interaction, args, client)}
    if (interaction.isContextMenu()) {
        const command = client.commands.get(interaction.commandName);
         interaction.deferReply({ ephemeral: command.ephemeral ? command.ephemeral : false })
      
                 if(interaction.isButton()) {
                    if (interaction.customId === "ticket-open") {
                        await interaction.deferReply({ ephemeral: true }) 
                        if(interaction.guild.channels.cache.find(e => e.topic == interaction.user.id)) {
                            return interaction.followUp({
                                content: "*Bakaa~* You already have a ticket open!",
                                ephemeral: true
                       })
                        }
                        const channelMade = interaction.guild.channels.create(`${interaction.user.tag} Ticket`, {
                            parent: CatergoryID,
                            topic: interaction.user.id,
                            permissionOverwrites: [{
                                id: interaction.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: client.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: StaffRoleId,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: StaffRoleId2,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: EveryoneRoleId,
                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }],
                            type: "GUILD_TEXT"}).then(async c => {interaction.followUp({embeds: [new Discord.MessageEmbed()
                        .setColor(colour.lightish_blue)
                        .setDescription(`<@${interaction.user.id}> You have made a ticket.`)
                        .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
                        .setAuthor({ name: "Your ticket has been made!", iconURL: `${client.user.displayAvatarURL()}`})
                        ], ephemeral: true})
                        const newtic = new Discord.MessageEmbed()
                        .setColor(colour.pink)
                        .setAuthor({ name: "Ayumi support!", iconURL: `${interaction.guild.iconURL()}`})
                        .setFooter({ text: "Your ticket will be recorded in a transcript", iconURL: `${interaction.user.displayAvatarURL()}`})
                        .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
                        .addField("To Create A Transcript:", "By pressing on the green button labbeld `Claim` the channels transcript will be sent here.\n When this ticket is closed too, a copy of this tickets Transcript will be kept also.")
                          
                        let button1 = new Discord.MessageButton()
                            .setCustomId("ticket-close")
                            .setLabel("Close Ticket")
                            .setEmoji("🔒")
                            .setStyle("DANGER")

                             let button2 =  new Discord.MessageButton()
                                .setCustomId("Transcript")
                                .setLabel("Claim")
                                .setStyle("SUCCESS")

                                let button3 = new Discord.MessageButton()
                                .setCustomId("zing")
                                .setDisabled(true)
                                .setEmoji("🕰️")
                                .setStyle("SECONDARY")

                                let button4 = new Discord.MessageButton()
                                .setCustomId("Lock")
                                .setLabel("Archieve Ticket")
                                .setStyle("DANGER")

                                let button5 = new Discord.MessageButton()
                                .setCustomId("Unlock")
                                .setLabel("Un-Archieve Ticket")
                                .setStyle("PRIMARY")


                                const row = new Discord.MessageActionRow()
                                 .addComponents(button1, button2, button3, button4, button5)
                        
                        c.send({
                            content: `<@${interaction.user.id}>`,
                            embeds: [newtic], 
                            components: [row]
                        }).then(msg => msg.pin())
                    })
            
                    } else if(interaction.customId === "ticket-close" ) {
                          const StaffPeople = interaction.guild.roles.cache.has(StaffRoleId || StaffRoleId2 || interaction.guild.ownerId)
                        if(!interaction.user.id == StaffPeople) {
                            interaction.reply({ content: "You do not have permissiont to close the ticket!", ephemeral: true})
                        } else {
                            
                        interaction.reply({embeds: [new Discord.MessageEmbed()
                            .setColor(colour.lightish_blue)
                            .setTitle("Ticket will be closed. <a:Iki_loading:938868057890250882>")
                            .setDescription("Closing the ticket in 3 seconds...")
                            .setAuthor({ name: "Ayumi support!", iconURL: `${interaction.guild.iconURL()}`})
                        ]})
                        if(((interaction.channel.topic === interaction.user.id)) === interaction.user.id && StaffRoleId && StaffRoleId2 !== interaction.user.id) {
                            return interaction.followUp({
                                content: `This ticket can only be closed by staff members.`,
                                ephemeral: true
                            })
                        }
                        const Trasnscript = await createTranscript(interaction.channel, {
                            limit: -1,
                            fileName: `${interaction.channel.topic}-Ticket-Transcript.html`,
                            returnBuffer: false
                        });
            
                        const embedClosedTicket = new Discord.MessageEmbed()
                        .setColor(colour["light red"])
                        .setDescription(`<@${interaction.user.id}>'s Ticket has been closed`)
                        .setAuthor({ name: "Ayumi support!", iconURL: `${interaction.guild.iconURL()}`})
            
                    client.channels.cache.get(TrasnscriptID).send({embeds: [embedClosedTicket], files: [Trasnscript]})
                 setTimeout(() => {
                   interaction.channel.delete()
                }, 3000)
                        }

                    } else if(interaction.customId === 'Transcript') {

                        const Trasnscript = await createTranscript(interaction.channel, {
                            limit: -1,
                            fileName: `${interaction.channel.topic}-Ticket-Transcript.html`,
                            returnBuffer: false
                        });

                        interaction.reply({ content: `Here is the tickets Transcript! <@${interaction.user.id}>`, files: [Trasnscript]})
                    } else if(interaction.customId === 'Lock') {
                        const StaffPeople = interaction.guild.roles.cache.has(StaffRoleId || StaffRoleId2 || interaction.guild.ownerId)
                        if(interaction.user.id !== StaffPeople) {
                            interaction.reply({ content: "You do not have permissiont to lock the ticket!", ephemeral: true})
                        } else {
                            interaction.channel.permissionOverwrites[{
                                id: interaction.user.id,
                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: client.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: StaffRoleId,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: StaffRoleId2,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: EveryoneRoleId,
                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }].then(interaction.reply({ embeds: [new Discord.MessageEmbed()
                                .setColor(colour['skin colour'])
                                .setDescription("<a:kao_teehee:950219956971249674> I have archieved the ticket for further reviewing!")
                            ], ephemeral: true}))
                        }
                    } else if(interaction.customId == 'Unlock') {
                        const StaffPeople = interaction.guild.roles.cache.has(StaffRoleId || StaffRoleId2 || interaction.guild.ownerId)
                        if(interaction.user.id !== StaffPeople) {
                            interaction.reply({ content: "You do not have permissiont to unlock the ticket!", ephemeral: true})
                        } else {
                            interaction.channel.permissionOverwrites[{
                                id: interaction.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: client.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: StaffRoleId,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: StaffRoleId2,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }, {
                                id: EveryoneRoleId,
                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            }].then(interaction.reply({ embeds: [new Discord.MessageEmbed()
                                .setColor(colour['skin colour'])
                                .setDescription("<a:kao_teehee:950219956971249674> I have un-archieved the ticket!")
                            ], ephemeral: true}))
                        }
                    }
            }
            if (command) {
				if (command.cooldown && !owners.includes(interaction.user.id)) {
					if (Timeout.has(`${command.name}${interaction.user.id}`)) return interaction.reply({
						embeds: [new Discord.MessageEmbed()
							.setColor("#ff3235")
							.setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}`})
							.setThumbnail("https://media.discordapp.net/attachments/719518088319467581/957084259208822814/XNo.png?width=147&height=146")
							.setTimestamp(Date.now())
							.setTitle(`${command.name} Cooldown!`)
							.setDescription(`<:Iki_xpinkdot:916869194400796772> You need to wait for ${ms(Timeout.get(`${command.name}${interaction.user.id}`) - Date.now(), { long: false })} to use __${command.name}__ again.`)
						], allowedMentions: {repliedUser: false}
					})
					command.run(interaction, args, client)
					Timeout.set(`${command.name}${interaction.user.id}`, Date.now() + command.cooldown)
					setTimeout(() => {
						Timeout.delete(`${command.name}${interaction.user.id}`)
					}, command.cooldown)
				}  else if(command.cooldown && owners.includes(interaction.user.id)) {
					command.run(interaction, args, client)
				} 
				
				if (!command.cooldown) {
					cmd.run(interaction, args, client)
			}
			
			}
                }})