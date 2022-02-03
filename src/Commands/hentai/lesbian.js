const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../util/assets/Json/emotes.json')
const colour = require('../../util/assets/Json/colours.json')

module.exports = new Command({

    name: "lesbian",
    description: "A Nsfw Command",
    type: "TEXT",
    userPermissions: " ",
    botPermissions: "ADMINISTRATOR",
    premium: true,
    cooldown: 4000,

    async run(message, args, client) {

        const errMessage = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setTitle(`${emotes.Error} THIS IS NOT AN NSFW CHANNEL`)
        .setDescription("Please run this command in an NSFW Channel")
        if (!message.channel.nsfw) {
          message.react("<:Iki_MAD:874174682427969536>");
    
          return message.reply({ embeds: [errMessage], allowedMentions: {repliedUser: false} }).then((msg) => {
            setTimeout(() => msg.delete(), 3000);
          });
        }
  
        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(url)

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
