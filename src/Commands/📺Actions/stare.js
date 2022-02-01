const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stare',
  cooldown: 10000,
  type: "TEXT",
  description: "send a anime stare gif",
  userPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {
     const embed = new MessageEmbed()
     .setTitle(`${message.author.username} is lurking`)
        .setImage(await anime.stare())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 