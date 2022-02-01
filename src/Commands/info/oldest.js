const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const { formatDate } = require("../../util/functions/functions.js")
const moment = require('moment');

module.exports = new Command({

    name: "oldest",
    aliases: ['oldest-user', "oldest-member"], 
    description: "find the oldest account in the server",
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,

    async run(message, args, client) {

        let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => a.user.createdAt - b.user.createdAt).first()

        const OldestUser = new Discord.MessageEmbed()
        .setTitle(`Oldest member in ${message.guild.name}`)
        .setColor("#4D9AE6")
        .setDescription(`**${mem.user.tag}** is the oldest member in **${message.guild.name}**\n**Acount Creation Date:** ${formatDate(mem.user.createdAt)}\n**Join Date:** ${moment(mem.user.joinedAt).format("MM-DD-YYYY [at] HH:mm")}`)
    
        message.channel.send({ embeds: [OldestUser] })
    }
})
