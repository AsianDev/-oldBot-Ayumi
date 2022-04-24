const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'cry',
    cooldown: 4000,  description: "sends a anime crying gif",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
  async run(message, args, client) {
     const embed = new MessageEmbed()
         .setTitle(`${message.author.username} cries...`)
        .setImage(await anime.cry())
        .setColor('RANDOM')
   message.channel.send({ embeds: [embed]})
}
} 