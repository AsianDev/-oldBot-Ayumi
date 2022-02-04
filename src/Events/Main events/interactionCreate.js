const Event = require("../../Handlers/Event.js");
const { EveryoneRoleId, StaffRoleId, StaffRoleId2, CatergoryID, TrasnscriptID  } = require("../../util/assets/Json/ticket.json")
const Discord = require("discord.js")
const colour = require("../../util/assets/Json/colours.json")
const { createTranscript } = require("discord-html-transcripts")

module.exports = new Event("interactionCreate", async(client, interaction) => {
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
                 if (command) command.run(interaction, args, client)}
          
                
         if(interaction.isButton()) {
            await interaction.deferReply()
            if(interaction.customId === "ticket-open") {
                if(interaction.guild.channels.cache.find(e => e.topic == interaction.user.id)) {
                    return interaction.followUp({
                        content: "*Bakaa~* You already have a ticket open!",
                        ephemeral: true
               })
                }
                const c = interaction.guild.channels.create(`${interaction.user.tag} Ticket`, {
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
                    type: "GUILD_TEXT"
            }).then(async c => {
                interaction.followUp({ content: `Your ticket has been made!`, ephemeral: true})
                const newtic = new Discord.MessageEmbed()
                .setColor(colour.pink)
                .setAuthor({ name: "Kaori support!", iconURL: `${interaction.guild.iconURL()}`})
                .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
                const row = new Discord.MessageActionRow()
                .addComponents 
                (
                    new Discord.MessageButton()
                    .setCustomId("ticket-close")
                    .setLabel("Close Ticket")
                    .setEmoji("🔒")
                    .setStyle("DANGER")
                )
                c.send({
                    content: `<@${interaction.user.id}>`,
                    embeds: [newtic], 
                    components: [row]
                }).then(msg => msg.pin())
            })

            } else if(interaction.customId === "ticket-close") {
                interaction.followUp({embeds: [new Discord.MessageEmbed()
                    .setColor(colour.lightish_blue)
                    .setTitle("Ticket will be closed. <a:loading:938879666800967720>")
                    .setDescription("Closing the ticket in 5 seconds...")
                    .setAuthor({ name: "Kaori support!", iconURL: `${interaction.guild.iconURL()}`})
                ]})
                if(((interaction.channel.topic === interaction.user.id)) === interaction.user.id && StaffRoleId && StaffRoleId2 !== interaction.user.id) {
                    return interaction.followUp({
                        content: `This ticket can only be closed by staff members.`,
                        ephemeral: true
                    })
                }
                const user = await client.users.fetch(interaction.channel.topic);
                const Trasnscript = await createTranscript(interaction.channel, {
                    limit: -1,
                    fileName: `${interaction.channel.topic}-Ticket-Copy.html`,
                    returnBuffer: false
                });

                const embedClosedTicket = new Discord.MessageEmbed()
                .setColor(colour["light red"])
                .setDescription(`<@${interaction.user.id}>'s Ticket has been closed`)
                .setAuthor({ name: "Kaori support!", iconURL: `${interaction.guild.iconURL()}`})

                client.channels.cache.get(TrasnscriptID).send({
                    embeds: [embedClosedTicket],
                    files: [Trasnscript]
                }).then(() => {
                    interaction.channel.delete()
                })
            }
         }         
        })