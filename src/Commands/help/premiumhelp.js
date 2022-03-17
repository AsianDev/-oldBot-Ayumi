const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require('../../Structures/Handlers/Command.js')

module.exports = new Command({
  name: 'phelp',
  description: "help command",
  type: "TEXT",
  userPermissions: [""],
  aliases: ["premiumhelp", "p=help", "p-help", "premium-help"],
  botPermissions: ["SEND_MESSAGES"],
  premium: true,
  async run(message, args, client) {

    const premhelp = new Discord.MessageEmbed()
    .setColor("#DD93F7")
    .setTitle("Premium")
    .setDescription("<a:Kao_crown:935906010122559548> **Premium Commands**")
    .addField('Commands [2]', '\`\`\`ini\n[ remind, wyr ]\n\`\`\`')
    .setTimestamp()
    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
    .setFooter({ text:` > Ayumi • ${message.channel.name}`})

    message.channel.send({embeds: [premhelp]})

  }})