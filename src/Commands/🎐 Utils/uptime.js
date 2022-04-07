const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const feroms = require('fero-ms')

module.exports = new Command({

    name: "stats",
    aliases: ['statistics'], 
    description: "Displays the bots stats",
  botPermissions: "SEND_MESSAGES",
  userPermissions: "SEND_MESSAGES",
 type: "Text",   cooldown: 4000,

    async run(message, args, client) {

        let uptime = client.uptime
      const shortenedUptime = `\`\`\`${feroms.ms(uptime)}\`\`\``;

    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username} Stats`)
    .addFields(
    { name: "Commands:", value: `\`\`\`${client.commands.size}\`\`\``, inline: true },
    { name: "Users:", value: `\`\`\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\`\`\``, inline: true },
    { name: "Channels",value: `\`\`\`${client.channels.cache.size}\`\`\``, inline: true },
    { name: "Uptime: ", value: shortenedUptime , inline: true },
    { name: "Ping:",value: `\`\`\`${Math.round(message.client.ws.ping)} ms\`\`\``, inline: true },
    { name: "RAM: ", value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true  },
    )
  .setColor(colour.lightish_blue)

  message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})


    }
})
