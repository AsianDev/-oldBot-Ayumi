const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const dares = require("../../config/assets/Json/dare.json");

module.exports = new Command({

    name: "dare",
    aliases: ['d'], 
    description: 'dare questions',
    userPermissions: "SEND_MESSAGES",
  botPermissions: "SEND_MESSAGES",   cooldown: 4000,

    async run(message, args, client) {

    const Truthembed = new Discord.MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setTitle(dares[Math.round(Math.random() * (dares.length - 1))])
    .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embeds: [Truthembed] });

    }
})
