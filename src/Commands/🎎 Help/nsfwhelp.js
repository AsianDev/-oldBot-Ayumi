const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')
const colour = require("../../config/assets/Json/colours.json")

module.exports = new Command({
  
  name: 'nsfw',
  description: "shows NSFW commands",
  type: "Text",
  cooldown: 2000,
  userPermissions: "KICK_MEMBERS",
  botPermissions: ["SEND_MESSAGES"],

  async run(message, args, client) {

    const embed = new Discord.MessageEmbed()
    .setColor(colour['light red'])
    .setTitle("WAIT!! There is children here! <:Mad:873155546075758592>")
    .setDescription("NSFW commands can only be done in NSFW channels, follow the gif below to enable NSFW on this channel!")
    .setImage("https://images-ext-2.discordapp.net/external/CT2zLAWBIMpJiRiCqNeGBGNLpDJ-x2JyjtIPoQ2qWsA/https/imgur.com/oe4iK5i.gif?width=550&height=96")
    if (!message.channel.nsfw) {
    message.react("<:MAD:874174682427969536>");
    return message.channel.send({embeds: [embed]})
  }

    const hentai = new Discord.MessageEmbed()
    .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
    .setDescription("```yaml\n Syntax: Ayu <hentai Command>```\n || Thats all your getting || ")
    .addField('__🔞 Hentai__', '\`\`\`ini\n[ Ahegao, anal, ass, boobjob, boobs, cloths, cum, dicks, feet, femdom, happyend, lesbiam, masturbation, pussy, spank, tentacles, trans, uniform, vanilla ]\n\`\`\`')
    .addField('__🔞 Real__', '\`\`\`ini\n[ ]\n\`\`\`')
    .setTimestamp()
    .setColor("BLUE")
    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
    .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})
    message.reply({ embeds: [hentai], allowedMentions: { repliedUser: false }})
  }
  
})