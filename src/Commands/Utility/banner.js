const Command = require('../../Structures/Handlers/Command.js')
const { MessageEmbed } = require("discord.js")
const colour = require("../../config/assets/Json/colours.json")
module.exports = new Command({

    name: "banner",
    description: "Get the banner of a user",
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    async run(message, args, client) {

      const member =  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author

      const data = await member.fetch();
      if (data?.banner) {
        const extension = data.banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${member.id}/${data.banner}${extension}?size=2048`;
  
        const embed = new MessageEmbed()
          .setDescription(`**__[Link to Banner](${url})__**`)
          .setTimestamp()
          .setTitle(`${member.user.tag}'s Banner`)
          .setImage(url)
          .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.guild.iconURL()}` })
          .setColor(data?.hexAccentColor || colour.pink);
        message.channel.send({ embeds: [embed] });
      } else if (data?.hexAccentColor) {
        const embed = new MessageEmbed()
          .setTimestamp()
          .setDescription(`**${member.user.tag}** does not have a banner but they have an accent color`)
          .setColor(data?.hexAccentColor);
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setTimestamp()
          .setDescription(`*Waaa~*... **${member.user.username}** doesn't have a banner or an accent color.`)
          .setColor(colour.pink);
        message.channel.send({ embeds: [embed] })
          }
    }
})
