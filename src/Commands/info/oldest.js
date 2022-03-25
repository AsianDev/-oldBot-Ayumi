const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const { formatDate } = require("../../config/functions/formateDate.js")
const moment = require('moment');

module.exports = new Command({

    name: "oldest",
    aliases: ['oldest-user', "oldest-member"], 
    description: "find the oldest account in the server",
    userPermissions: "SEND_MESSAGES",
  botPermissions: "SEND_MESSAGES",   cooldown: 4000,

    async run(message, args, client) {

        let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => a.user.createdAt - b.user.createdAt).first()

        const OldestUser = new Discord.MessageEmbed()
        .setAuthor({ name: `${mem.user.tag} is the oldest.`, iconURL: `${mem.user.displayAvatarURL()}`})
        .setColor("#4D9AE6")
        .setThumbnail(`${mem.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`**Oldest user:**\n*${mem.user.tag}* \n**Account Creation Date:** ${formatDate(mem.user.createdAt)}\n**Join Date:** ${moment(mem.user.joinedAt).format("MM-DD-YYYY [at] HH:mm")}`)
        .setTimestamp()

        message.channel.send({ embeds: [OldestUser] })
    }
})
