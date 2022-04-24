const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'happy',
  botPermissions: 'SEND_MESSAGES',
  type: "Text",
  description: "sends a happy anime gif",
  userPermissions: ["SEND_MESSAGES"],
    cooldown: 4000,
async run(message, args, client) {
     const embed = new MessageEmbed()
         .setTitle(`${message.author.username} is happy!`)
        .setImage(await anime.happy())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 