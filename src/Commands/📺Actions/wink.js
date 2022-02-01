const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'wink',
  description: "shows a gif of anime winking",
  type: "TEXT",
  cooldown: 10000,
  userPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {
     const embed = new MessageEmbed()
        .setImage(await anime.wink())
        .setColor('RANDOM')
   message.channel.send({ embeds: [embed]})
}
} 