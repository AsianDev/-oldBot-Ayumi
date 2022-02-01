const Command = require('../../Handlers/Command.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const Discord = require("discord.js");

module.exports = new Command ({
    name: 'guildinvites',
  description: "sends a button that links to Ikigai | Anime • Social •  生きがい",
  type: "TEXT",
  aliases: ["guildinvite"],
  cooldown: 5000,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
    async run(message, args, client) {    
        const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Come and join Ikigai | Anime • Social •  生きがい`)
    .setFooter({ text: "Kaori©"})
    .setDescription("If you like Kaori, come and join the server, we have heaps of nice people and fun giveaways, anime centred and much more!")
    const row = new MessageActionRow()        
    .addComponents(
        new MessageButton()
        .setLabel('Join!')
        .setURL('https://discord.gg/cB9WPMAdR6')
       .setStyle('LINK'),
    );
 
    message.channel.send({embeds: [embed], components: [row]})
}});
