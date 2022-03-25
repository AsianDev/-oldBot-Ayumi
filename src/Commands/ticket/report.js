const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
  name: 'report',
  description: 'Report a bug',
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
 type: "Text",
  cooldown: 10000,


  async run(message, args, client) {
    const channel = client.channels.cache.get('926698468439900190');
    const target = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])

    const noTarget = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("<:x_:904736839036993586> Please mention a user to report")
    .setTitle("Missing arguement!")

    if(!target) return message.channel.send({ embeds: [noTarget] })
    const query = args.slice(2).join(" ");
    if(!query[0]) return message.reply("Please provide a report on this user!");
    const embed = new Discord.MessageEmbed()
    .setTitle("User has been reported")
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    .addFields(
      {name: 'Reporter', value: `<@${message.author.id}>`},
      {name: 'Reported user', value: `${target} || (${target.id})`},
      {name: 'Report', value: `> ${query}`}
      )
      const reported = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Thank you for reporting ${target}.\n\n The moderators will handle this case as soon as possible.`)
      .setTitle("Thanks for reporting")  

      message.channel.send({ embeds: [reported] })
      .then((msg) => msg.delete({ timeout: 5000 }))

      channel.send({ embeds: [embed], content: "Please handle this case ASAP" });
  }})