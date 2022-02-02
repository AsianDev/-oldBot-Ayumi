const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'smile',
  type: "TEXT",
  cooldown: 10000,
  description: "sends a anime smile gif",
  userPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {
     const embed = new MessageEmbed()
        .setImage(await anime.smile())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 