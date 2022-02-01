const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const Levels = require("discord-xp")
const canvacord = require("canvacord")
module.exports = new Command({
    name: "rank",
    description: "Check your level rank",
    cooldown: 5000,
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"], 
     type: "TEXT",
    aliases: [ 'xp','rank'],
    async run(message, args, client) {
      const NOXPEMBED = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You havent recieved any experience points yet. Keep chatting and you will reach their soon!")
 
  try {
        const member = message.author 
          const user = await Levels.fetch(member.id, message.guild.id);
          if(user.length < 1) return message.reply({embeds: [NOXPEMBED], allowedMentions: {repliedUser: false}});
            const neededXp = Levels.xpFor(parseInt(user.level) + 1);
            const rank = new canvacord.Rank()
          .setAvatar(message.author.displayAvatarURL({dynamic: false, format:'png'}))
          .setCurrentXP(user.xp)
          .setLevel(user.level)
          .setRequiredXP(neededXp)
          .setStatus('idle')
          .setProgressBar('#544CEB', 'COLOR')
          .setUsername(`${member.username}`)      
          .setDiscriminator(`${member.discriminator}`)
          .setRankColor("#0A0EF3F")
         .setLevelColor("#F67B73")
            .setBackground('IMAGE', 'https://bit.ly/333du8W')
           rank.build()
             .then(data => {
              const attachment = new Discord.MessageAttachment
              (data, 'IkigaiServerRankCard.png')
               message.channel.send({files: [attachment], content: `<@${message.author.id}> this is your current ranking.`});
          })
  
      } catch (e) {
        console.log(e)
      }
  }
})