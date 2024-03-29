const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const c = require('../../config/assets/Json/colours.json')

module.exports = new Command({
    name: "ticket",
    description: 'setup a ticket System',
    userPermissions: "MANAGE_GUILD",
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 6000,
    type: "Slash",
    async run(interaction, args, client) {

        const OpenTicket = new Discord.MessageEmbed()
        .setColor(c.pink)
        .setAuthor({ name: "Ayumi support!", iconURL: `${interaction.user.displayAvatarURL()}` })
        .setDescription("Click on the button below to make a support thread.")
        .setTitle('__**Ticket**__')
        .setThumbnail(`${interaction.guild.iconURL({ dynamic: true, size: 512 })}`)

        const row = new Discord.MessageActionRow()
        .addComponents
         (
            new Discord.MessageButton()
            .setLabel("Click me!")
            .setCustomId("ticket-open")
            .setEmoji('939098734778794035')
            .setStyle('PRIMARY')
         )
         interaction.followUp({embeds: [OpenTicket], components: [row], ephemeral: true})
         }
    })
