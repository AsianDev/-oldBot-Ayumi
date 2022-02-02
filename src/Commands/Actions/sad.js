const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sad',
  type: "TEXT",
  cooldown: 10000,
  description: "send a anime sad gif",
  userPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {
     const embed = new MessageEmbed()
         .setTitle(`${message.author.username} is sad ;(`)
        .setImage(await anime.sad())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 