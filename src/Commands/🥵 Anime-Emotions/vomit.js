const Discord = require("discord.js");
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: 'vomit',
    description: "sends vomit images",
    
    userPermissions: ["SEND_MESSAGES"],
    aliases: ["spew"],
    cooldown: 4000,
    async run (message, args, client) {
  
        const image = await nekoapi.reaction.vomit()

        const embed = new Discord.MessageEmbed()
        .setImage(image.url)
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] });
    },
};