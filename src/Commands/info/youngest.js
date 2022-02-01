const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const { formatDate } = require('../../util/functions/functions.js')
const moment = require('moment');

module.exports = new Command({

    name: "youngest",
    aliases: ['youngest-user', "youngest-member"], 
    description: "find the youngest account in the server",
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,

    async run(message, args, client) {

        let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => b.user.createdAt - a.user.createdAt).first()

    const YoungestUser = new Discord.MessageEmbed()
    .setTitle(`Youngest member in ${message.guild.name}`)
    .setColor("#4D9AE6")
    .setDescription(`**${mem.user.tag}** is the youngest member in **${message.guild.name}**\n**Account Creation Date:** ${formatDate(mem.user.createdAt)}\n**Join Date:** ${moment(mem.user.joinedAt).format("MM-DD-YYYY [at] HH:mm")}`)

    message.channel.send({ embeds: [YoungestUser] })
    }
})
