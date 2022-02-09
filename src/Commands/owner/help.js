const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
  name: 'ownerhelp',
  description: "help command",
  type: "TEXT",
  userPermissions: [""],
  aliases: ["owner-help", "ohelp", "ownerh", "o"],
  botPermissions: ["SEND_MESSAGES"],
  owner: true,
  async run(message, args, client) {

   const OwnerHelpEmbed = new Discord.MessageEmbed()
   .setTimestamp()
   .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
   .setColor("#90F781")
   .setDescription("```yaml\n Syntax: Kao <Owner Command>```")
   .addField('__ Owner Commands__', '\`\`\`ini\n[ apply, c.u.b, credits, dead, emojis, eval, leave, setqwelc, reload, restart, change-username, zex  ]\n\`\`\`')
   .addField('__Premium Setup Commands:__', '\`\`\`ini\n[ add-premium, remove-premium ]\n\`\`\`')
   .setThumbnail(message.member.user.displayAvatarURL({dynamic: true}))

  message.reply({ embeds: [OwnerHelpEmbed], allowedMentions: { repliedUser: false }}) 
  }
})