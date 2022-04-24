const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const gen = require("images-generator")

module.exports = new Command ({
  name: "dog",
  description: "sends a cat image",
  aliases: ["inu"],
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",  
    cooldown: 4000,  type: "Text",

    async run(message, args, client) {

        let dogImage = await gen.animal.dog();
        
                 let embed = new Discord.MessageEmbed()
                 .setColor(`RANDOM`)
                 .setImage(dogImage)
                 .setTimestamp();
                 message.channel.send({ embeds: [embed] });
                 
          }
})