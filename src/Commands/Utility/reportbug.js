const Discord = require('discord.js')
module.exports = {
  name: 'bug',
  aliases: ["reportbug", "report-bug", "bug-report"],
  description: 'Report a bug',
  type: "TEXT",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
	cooldown: 10000,

  async run(message, args, client) {

    const NObuG = new Discord.MessageEmbed()
    .setColor("DARK_RED")
    .setDescription("Please provide a bug to report.")

    const channel = client.channels.cache.get('917387340744384572');
    const query = args.slice(2).join(" ");
    if(!query[1]) return message.reply({embed: [NObuG]});
    const embed = new Discord.MessageEmbed()
    .setTitle("New bug reported!")
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    .addFields(
      {name: 'Bug reporter', value: `${message.author.tag}`},
      {name: 'User ID', value: `${message.author.id}`},
      {name: 'Bug', value: `${query}`}
      )
      .setFooter({ text: "Kaori©"})
      message.reply({content: 'Thank you for reporting this issue to us, owner will fix it asap.'});
      channel.send({embeds: [embed]});
      
  }
}