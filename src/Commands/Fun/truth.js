const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const truth = require("../../config/assets/Json/truths.json");

module.exports = new Command({

    name: "truth",
    aliases: ['t'], 
    description: 'truth questions',
  userPermissions: "SEND_MESSAGES",
  botPermissions: "SEND_MESSAGES",   
 cooldown: 4000,

    async run(message, args, client) {

    const Truthembed = new Discord.MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setTitle(truth[Math.round(Math.random() * truth.length)])
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embeds: [Truthembed] });

    }
})
