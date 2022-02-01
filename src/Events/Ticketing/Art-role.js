const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const Event = require("../../Handlers/Event.js");
module.exports = new Event("interactionCreate", async (client, interaction) =>{


if (interaction.customId === 'Art-role') {
    const Artchannel = await interaction.guild.channels.create(`${interaction.user.tag} Ticket`, {
        type: 'GUILD_TEXT',
        parent: "927143955487948800", // catergory to make channel
        permissionOverwrites: [{
         id: interaction.guild.id,
         deny: ['VIEW_CHANNEL'],
       },
    {
        id: "873145243715919882", // mod id
        allow: ['VIEW_CHANNEL'],
      }],
      });
    Artchannel.permissionOverwrites.edit(interaction.member, {
     SEND_MESSAGES: true,
     VIEW_CHANNEL: true,
     })

    const embed = new MessageEmbed()
        .setTitle('__**Ticket Opened!**__')
        .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your-self and what kind of art you wish to post in <#930042852854083634>\nThank You!')
        .setColor("#FCFCC8")
        .setTimestamp()

    const del = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('delete')
            .setLabel('🗑️ Delete Ticket!')
            .setStyle('DANGER'),
        );
    Artchannel.send({
        content: `Welcome <@${interaction.user.id}>! You can apply for the artist role here.`,
        embeds: [embed],
        components: [del]
    }).then(interaction.reply({
        content: `You can apply for your artist role in ${Artchannel}`,
        ephemeral: true
    }))
} else if (interaction.customId === 'delete') {
    const Artchannel2 = interaction.channel
    Artchannel2.delete();
}})