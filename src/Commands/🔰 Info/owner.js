const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command ({
    name: 'owner',
    description: "Shows bot owner",
    cooldown: 4000,
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 async run(message, args, client) {   
        const embed = new Discord.MessageEmbed()
        .setColor("DARK_PURPLE")
        .setDescription(` My owner is **Sensei | 旭陽#6427** <a:AnimeWave:912596615028678656>`)
        .setAuthor({ name: `${message.author.tag}`})
        const row = new Discord.MessageActionRow()        
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Join Ikigai')
            .setURL("https://discord.gg/jNgJxWcjDm")
            .setStyle('LINK'),
        );
        message.channel.send({embeds: [embed], components: [row]})
    }});
    

