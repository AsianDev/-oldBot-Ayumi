const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'nervous',
  
    cooldown: 4000,  description: "sends a anime nervous gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {
     const embed = new MessageEmbed()
        .setImage(await anime.nervous())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 