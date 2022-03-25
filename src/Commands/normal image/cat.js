const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const gen = require("images-generator")

module.exports = new Command ({
  name: "cat",
  description: "sends a cat image",
  cooldown: 10000,
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",  
type: "Text",
    async run(message, args, client) {

        let catImage = await gen.animal.cat();
        
                 let embed = new Discord.MessageEmbed()
                 .setColor(`RANDOM`)
                 .setImage(catImage)
                 .setTimestamp();
                 message.channel.send({ embeds: [embed] });
                 
          } 
})