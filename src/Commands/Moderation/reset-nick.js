const Discord = require("discord.js")
const Command = require('../../Structures/Handlers/Command.js')
const errorX = "<:Ikix:904736839036993586>"

module.exports = new Command ({ 
   name: "resetnick",
  description: "Sets the nickname of the user",
  userPermissions: ["MANAGE_NICKNAMES"],
  botPermissions: "MANAGE_NICKNAMES",
  type: "TEXT",
  cooldown: 10000,
  aliases: ["rnick", "resetn", "reset"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   async run(message, args, client) {
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author
    if (!member) await message.reply({
      embeds: [
        new Discord.MessageEmbed()
        .setDescription("Example: \n\n >  kao resetn @user")
    .setTitle(`${errorX} MISSING ARGUEMENT`)
    .setColor("RED")
      ]})
    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.user() + " nickname!"
      );
    }
  },
})