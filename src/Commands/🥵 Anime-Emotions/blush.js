const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'blush',
  
    cooldown: 4000,  description: "sends a anime blush gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {
     const embed = new MessageEmbed()
         .setTitle(`${message.author.username} blushes...`)
        .setImage(await anime.blush())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 