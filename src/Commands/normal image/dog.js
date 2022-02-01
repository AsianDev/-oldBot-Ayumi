const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const gen = require("images-generator")

module.exports = new Command ({
  name: "dog",
  description: "sends a cat image",
  aliases: ["inu"],
  permission: "SEND_MESSAGES",
  type: "TEXT",
  cooldown: 10000,

    async run(message, args, client) {

        let dogImage = await gen.animal.dog();
        
                 let embed = new Discord.MessageEmbed()
                 .setColor(`RANDOM`)
                 .setImage(dogImage)
                 .setTimestamp();
                 message.channel.send({ embeds: [embed] });
                 
          }
})