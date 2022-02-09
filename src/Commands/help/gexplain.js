const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
  name: 'giveaway',
  description: "giveaway help command",
  type: "TEXT",
  cooldown: 5000,
  aliases: ["g"],
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  
async run(message, args, client) {
  const embed = new Discord.MessageEmbed()
  .setTitle("Please select a specific help section.")
  .addField('Catergory', " 🎬 ``Action``\n  😜 ``Fun`` \n 🎁 ``Giveaway``\n 🖼️ ``Image`` \n  <:Iki_info:938937122931503194> ``Information``\n  🛡️ ``Moderation``\n 🗒️ ``Setup``\n <:Links:904222183813947463> ``Support``\n ✅ ``Utility``\n Do **Kao help <catergory**> to show the help catergory.\n\n   **|** [**Discord**](https://discord.gg/TQ3mTPE7Pf)  **|** [**Vote**](https://top.gg/servers/873143392488525834)", false)
  .setColor("WHITE")
  .setURL("https://discord.gg/TQ3mTPE7Pf")
  .setThumbnail(message.member.user.displayAvatarURL({dynamic: true, size: 2048,}))
  .setFooter({ text: `Requested by ${message.author.tag} • ${client.commands.size} commands in total`})
  const row = new Discord.MessageActionRow()        
    .addComponents(
      new Discord.MessageButton()
      .setURL("https://discord.gg/TQ3mTPE7Pf")
      .setLabel("Ikigai server!")
      .setStyle("LINK")
      )
      .addComponents(
        new Discord.MessageButton()
        .setURL("https://top.gg/servers/873143392488525834")
        .setLabel("Vote for Ikigai")
        .setStyle("LINK")
        )
    if(!args[1]) {  message.channel.send({embeds: [embed], components: [row]}) }


  const ga = new Discord.MessageEmbed()
  .setAuthor({ name: "Giveaway Guide", iconURL: `https://cdn.discordapp.com/avatars/926305982437552178/d4cf44c575d31893b1f00759eb298cd5.webp?size=4096`  })
  .setDescription("Welcome to the Giveaway Guide. Here you will find an explanation on how to start a giveaway.")
  .addField("_CHANNEL:_", " > → The channel will be where the giveaway starts.")
  .addField("_TIME FORMAT:_", " > → The time format will be how you will define how long the giveaway goes for.\n > → The availabe time formate are:\n > \`\`s = seconds\`\` \n > \`\`m = minutes\`\`  \n  > \`\`h = hours\`\` \n > \`\`d = days\`\`")
  .addField("_WINNERS:_", " > → The amount of winners will be defined by a number.")
  .addField("_PRIZE:_", " > → The prize is what the giveaway will be on.\n >  This is important as it is the key to this giveaway.")
  .addField('Example', '```Kao start <channel> <time> <number of winners> <prize>```', false)
  .setTimestamp()
  .setColor("RED")
  .setFooter({ text:` > Kaori • ${message.channel.name}`})

 if(args[1] === 'guide'|| args[1] === 'Guide', "explain"){  message.channel.send({embeds: [ga]})}}});



  // \n\n [**Discord**](https://discord.gg/TQ3mTPE7Pf)
