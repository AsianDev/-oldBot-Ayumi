const Discord = require("discord.js");
const { utc } = require("moment");
const Command = require('../../Handlers/Command.js')
let os = require('os')
let cpuStat = require("cpu-stat")
const { version } = require("discord.js")
const c = require("../../config/assets/Json/colours.json")
let feroms = require("fero-ms")

module.exports = new Command({
    name: "bot-info",
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 cooldown: 4000,
    aliases: ["botinfo"],
    description: "Provides bot information",
    async run(message, args, client) {

        cpuStat.usagePercent(function(err, percent, seconds) {
          if (err) {
              return console.log(err);
          }
          let uptime = client.uptime
          const shortenedUptime = `\`\`\`${feroms.ms(uptime)}\`\`\``;


        let botInfoEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}`})
        .setColor(c.pink)
        .setDescription(`*Heyaa~* there! I am in **${client.guilds.cache.size}** __servers__ with **${client.users.cache.size}** __people__ using me!\n I currently have **${client.commands.cache.size}** __commands__!`)
        .addField(":robot: Created at", ` ${utc(client.user.createdTimestamp).format(
          "Do MMMM YYYY HH:mm:ss"
        )}`, true)
        .addField("⏳ Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("⌚️ Uptime ", `${shortenedUptime}`, true)
        .addField("👾 Node", `${process.version}`)
        .addField("⚡ CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
        .addField("⚡ CPU usage", `${percent.toFixed(2)}%`)
        .addField("🖥 API Latency", `${(client.ws.ping)}ms`)  
        .setFooter({ text
: `Coded on version ${version} of discord.js`})
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        message.channel.send({ embeds: [botInfoEmbed] });
      }
      )
    },
  })