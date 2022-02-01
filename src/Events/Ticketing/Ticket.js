const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const Event = require("../../Handlers/Event.js");
module.exports = new Event("interactionCreate", async (client, interaction) =>{


if (interaction.customId === 'Ticket') {
    const channel = await interaction.guild.channels.create(`${interaction.user.tag} Ticket`, {
        type: 'GUILD_TEXT',
        parent: "927143955487948800", // catergory to make channel
        permissionOverwrites: [{
         id: interaction.guild.id,
         deny: ['VIEW_CHANNEL'],
       },
    {
        id: "873145243715919882", // mod id
        allow: ['VIEW_CHANNEL'],
      },
    {
        id: "873957840627302420", // mod id
        allow: ['VIEW_CHANNEL'],
      }],
      });
     channel.permissionOverwrites.edit(interaction.member, {
     SEND_MESSAGES: true,
     VIEW_CHANNEL: true,
     })

    const embed = new MessageEmbed()
        .setTitle('__**Ticket Opened!**__')
        .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
        .setColor("#FCFCC8")
        .setTimestamp()

    const del = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('del')
            .setLabel('🗑️ Delete Ticket!')
            .setStyle('DANGER'),
        );
    channel.send({
        content: `Welcome <@${interaction.user.id}>`,
        embeds: [embed],
        components: [del]
    }).then(interaction.reply({
        content: `Your ticket has been made in ${channel}`,
        ephemeral: true
    }))
} else if (interaction.customId === 'del') {
    const channel2 = interaction.channel
    channel2.delete();
}})