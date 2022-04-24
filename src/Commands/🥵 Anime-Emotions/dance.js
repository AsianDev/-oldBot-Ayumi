const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'dance',
  
    cooldown: 4000,  description: "sends a dancing anime gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {
     const embed = new MessageEmbed()
     .setTitle(`${message.author.username} is dancing 🥳`)
        .setImage(await anime.dance())
        .setColor('RANDOM')
   message.channel.send({ embeds: [embed]})
}
} 