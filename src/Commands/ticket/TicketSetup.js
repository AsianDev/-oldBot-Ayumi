const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
module.exports = new Command({
    name: "ticket",
    description: 'setup a ticket System',
    type: "TEXT",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 6000,
    async run(message, args, client) {
        const TicketSetupEmbed = new Discord.MessageEmbed()
        .setColor("#FCC8EA")
        .setAuthor({ name: "Kaori support!", iconURL: `${message.author.displayAvatarURL()}` })
        .setDescription("**1.** Press the **Support** button to make a Support ticket.\n**2.** Press the **Apply for artist role** to make an apply ticket")
        .setTitle('__**Ticket**__')

    const bt = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('Ticket')
            .setLabel("🎟️ Support ")
            .setStyle("PRIMARY"),
        )
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('Art-role')
            .setLabel('🎨 Apply for Artist role.')
            .setStyle("SUCCESS"),
        )
    message.channel.send({
        embeds: [TicketSetupEmbed],
        components: [bt]
    });
}
})