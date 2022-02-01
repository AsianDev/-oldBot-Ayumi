const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const questions = require("../../util/assets/Json/wyr.json")
const settings = require("../../util/Data/settings.json")
module.exports = new Command({

    name: 'wyr',
    aliases: ['wouldyourather', "would-you-rather"], 
    description: 'play wyr',
    type: "TEXT",
    userPermissions: "",
    botPermissions: "SEND_MESSAGES",
    cooldown: 5000,
    premium: true,

    async run(message, args, client) {
        const messagetext = questions[Math.floor(Math.random() * questions.length)];
        const question = messagetext.split("Would you rather ")[1];
        const q = question.split(" or ");
        const Option1 = q[0];
        const Option2 = q[1];
        const embed = new Discord.MessageEmbed()
          .setTitle("Would You Rather")
          .setDescription(
            `🇦 ${Option1} \n\n **OR** \n\n :regional_indicator_b: ${Option2}`
          )
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
          .setColor("#90F781")
          .setFooter({text: `Made by ${settings.owner}`, iconURL: client.user.displayAvatarURL()})
          .setTimestamp();
        wyrmessage = await message.channel.send({ embeds: [embed] });
        wyrmessage.react("🇦");
        wyrmessage.react("🇧");
    }
})
