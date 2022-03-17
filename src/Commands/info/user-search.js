
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({

  name: "userfind",
  aliases: ["us", "user-search"],
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
  description: "Seach users who have a certain name in the server!",
  type: "TEXT",
  cooldown: 5000,

  async run (message, args, client) {

    const NOUSER = new Discord.MessageEmbed()
    .setColor("DARK_AQUA")
    .setDescription("*Waaa~* please specify a username you wish for me to find!")

    const user = args[1]
    if (!user) return message.channel.send({embeds: [NOUSER]});

    const array = [];

    message.guild.members.cache.forEach((use) => {
      if (use.user.username.toUpperCase() == user.toUpperCase() || use.user.id === user.toUpperCase() || use.user.tag.toUpperCase() == user.toUpperCase() || use.displayName.toUpperCase() == user.toUpperCase()|| use.user.discriminator == user.toUpperCase() || `#${use.user.discriminator}` == user.toUpperCase()) {
        array.push(`● ${use.user}\n> __Tag:__ ${use.user.tag}\n> __ID:__ ${use.user.id}\n> __Nickname:__ ${use.displayName == use.user.username ? "No Nickname" : use.displayName}\n`);
      }
    });

    const Noresults = new Discord.MessageEmbed()
      .setAuthor({ name: `${message.guild.name} ● Searching for ${user}`, iconURL: message.guild.iconURL( { dynamic: true } )})
      .setColor("RED")
      .setDescription(array.join("\n") || "❌ No Results - Can't Find Any User with this username!")
      .setFooter({ text: `${array.length} result(s)`})
      .setTimestamp()
      .setImage("https://tenor.com/view/arima-ichika-ichika-loading-waiting-thinking-gif-21829545")
    message.channel.send({embeds: [Noresults]})
  
  }})