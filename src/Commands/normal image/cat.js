const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const gen = require("images-generator")

module.exports = new Command ({
  name: "cat",
  description: "sends a cat image",
  aliases: [""],
  cooldown: 10000,
  permission: "SEND_MESSAGES",
  type: "TEXT",
    async run(message, args, client) {

        let catImage = await gen.animal.cat();
        
                 let embed = new Discord.MessageEmbed()
                 .setColor(`RANDOM`)
                 .setImage(catImage)
                 .setTimestamp();
                 message.channel.send({ embeds: [embed] });
                 
          } 
})