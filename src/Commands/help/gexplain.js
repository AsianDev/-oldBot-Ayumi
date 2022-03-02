const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
  name: 'giveawayguide',
  description: "giveaway help command",
  type: "TEXT",
  cooldown: 5000,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  
async run(message, args, client) {

  const ga = new Discord.MessageEmbed()
  .setAuthor({ name: "Giveaway Guide", iconURL: `https://cdn.discordapp.com/avatars/926305982437552178/d4cf44c575d31893b1f00759eb298cd5.webp?size=4096`  })
  .setDescription("Welcome to the Giveaway Guide. Here you will find an explanation on how to start a giveaway.")
  .addField("_CHANNEL:_", " > → The channel will be where the giveaway starts.")
  .addField("_TIME FORMAT:_", " > → The time format will be how you will define how long the giveaway goes for.\n > → The availabe time formate are:\n > \`\`s = seconds\`\` \n > \`\`m = minutes\`\`  \n  > \`\`h = hours\`\` \n > \`\`d = days\`\`")
  .addField("_WINNERS:_", " > → The amount of winners will be defined by a number.")
  .addField("_PRIZE:_", " > → The prize is what the giveaway will be on.\n >  This is important as it is the key to this giveaway.")
  .addField('Example', '```Kao giveaway <channel> <time> <number of winners> <prize>```', false)
  .setTimestamp()
  .setColor("RED")
  .setFooter({ text:` > Kaori • ${message.channel.name}`})
message.channel.send({embeds: [ga]})
}})
  



  // \n\n [**Discord**](https://discord.gg/TQ3mTPE7Pf)
