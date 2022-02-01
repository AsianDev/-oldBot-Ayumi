const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')
module.exports = new Command({
  name: 'review',
  description: 'Give feedback on bot',
  type: "TEXT",
  cooldown: 10000,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
  async run(message, args, client) {
    const channel = client.channels.cache.get('917387998918742077');
    const query = args.slice(2).join(" ");
    if(!query[1]) return message.reply("Please provide a review on the server Ikigai <3");
    const embed = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setThumbnail(message.author.displayAvatarURL())
    .setTitle("New Review.")
    .addFields(
      {name: 'Reviewer', value: `${message.author.tag}`},
      {name: 'User ID', value: `${message.author.id}`},
      {name: 'Review', value: `${query}`}
      )
      .setFooter({ text: "Kaori©"})
      message.reply({content: 'Thank you for giving a review on Ikigai. <3'});
      channel.send({embeds: [embed]});
      
  }
})