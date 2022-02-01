const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'think',
  type: "TEXT",
  description: "sends a anime thinking gif",
  userPermissions: ["SEND_MESSAGES"],
  cooldown: 10000,
aliases: ["thinking"],
async run(message, args, client) {
     const embed = new MessageEmbed()
         .setTitle(`${message.author.username} is thinking`)
        .setImage(await anime.thinking())
        .setColor('RANDOM')
   message.channel.send({ embeds: [embed]})
}
} 