
const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js');

module.exports = new Command({
  name: "nick",
  description: "nickname a user",
  userPermissions: ["MANAGE_NICKNAMES"],
  botPermissions: "SEND_MESSAGES",
    type: "TEXT",
  aliases: ["nickname"],
  cooldown: 10000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   async run(message, args, client) {
    if(message.content.includes('@everyone')) return message.channel.send(`*Waa~* ${message.author.username} dont chnage their nickname to that!`)
    if(message.content.includes('@here')) return message.channel.send(`${message.author.username} dont be a baka and change their nickname to that!`)
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author
    if (!member) return message.reply("Please specify a member!");
    const arguments = args.slice(2).join(" ");
    if (!arguments) return message.reply("Please specify a nickname!");
    try {
      member.setNickname(arguments);
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`${member} has been nicknamed to ${arguments}`)
      message.channel.send({embeds: [embed]})
    } catch (err) {
      message.reply(`${err}`);
    }
  },
})