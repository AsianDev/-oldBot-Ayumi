const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'scream',
    
    description: "sends a anime screaming gif",
    userPermissions: ["SEND_MESSAGES"],
    cooldown: 10000,
    botPermissions: 'SEND_MESSAGES',
type: "Text",
async run(message, args, client) {
     const embed = new MessageEmbed()
        .setImage(await anime.scream())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 