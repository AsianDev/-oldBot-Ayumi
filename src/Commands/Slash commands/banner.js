const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js")
module.exports = new Command({

    name: "banner",
    description: "Get the banner of a user",
    type: 'SLASH',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    slashCommandOptions: [{
        type: 6,
        name: "user",
        description: "The user you want to see",
        required: false,
    }],

    async run(interaction, args, client) {

        const { user } =
        interaction.guild.members.cache.get(args[0]) || interaction.member;
      const data = await user.fetch();
      if (data?.banner) {
        const extension = data.banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${extension}?size=2048`;
  
        const embed = new MessageEmbed()
          .setDescription(`**__[Link to Banner](${url})__**`)
          .setTimestamp()
          .setTitle(`${user.tag}'s Banner`)
          .setImage(url)
          .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.guild.iconURL()}` })
          .setColor(data?.hexAccentColor || client.color);
        interaction.followUp({ embeds: [embed] });
      } else if (data?.hexAccentColor) {
        const embed = new MessageEmbed()
          .setTimestamp()
          .setDescription(`**${user.tag}** does not have a banner but they have an accent color`)
          .setColor(data?.hexAccentColor);
        interaction.followUp({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setTimestamp()
          .setDescription(`*Waa~*... **${user.username}** doesn't have a banner or an accent color.`)
          .setColor(client.color);
        interaction.followUp({ embeds: [embed] })
          }
    }
})
