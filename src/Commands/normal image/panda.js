const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js");
const gen = require("images-generator")

module.exports = new Command ({
  name: "panda",
  description: "sends a panda image",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",  type: "TEXT",
  cooldown: 10000,

    async run(message, args, client) {

        let pandaImage = await gen.animal.panda();
        
                 let embed = new Discord.MessageEmbed()
                 .setColor(`RANDOM`)
                 .setImage(pandaImage)
                 .setTimestamp();
                 message.channel.send({ embeds: [embed] });
                 
          }
})