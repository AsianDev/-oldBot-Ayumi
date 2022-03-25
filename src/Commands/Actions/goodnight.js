const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'goodnight',
  botPermissions: 'SEND_MESSAGES',
  type: "Text",
  description: "sends a sleeping / tired anime gif",
  userPermissions: ["SEND_MESSAGES"],
  cooldown: 10000,

async run(message, args, client) {
     const embed = new MessageEmbed()
     .setTitle(`${message.author.username} Oyasumi ZzZ`)
        .setImage(await anime.goodnight())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 