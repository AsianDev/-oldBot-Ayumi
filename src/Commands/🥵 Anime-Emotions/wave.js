const Discord = require('discord.js');
const anime = require('anime-actions');

module.exports = {
  name: 'wave',
  description: "send a anime waving gif",
    cooldown: 4000,  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {
     const embed = new Discord.MessageEmbed()
        .setImage(await anime.wave())
        .setColor('RANDOM')
   message.channel.send({ embeds: [embed]})
}
} 