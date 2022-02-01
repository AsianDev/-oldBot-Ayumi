const Discord = require("discord.js");
const moment = require("moment");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "bot-info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
      type: "TEXT",
    cooldown: 10000,
    aliases: ["botinfo"],
    description: "Provides bot information",
    async run(message, args, client) {
        const duration = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]");
        let embed = new Discord.MessageEmbed()
        .setTitle("Kaori's Info", client.user.avatarURL())
        .setURL("https://discord.gg/jNgJxWcjDm")
        .setColor("RANDOM")
        .setDescription(
          `**Bot Name: **Kaori \n**Owner: **Sensei | 旭陽#6427\n**Total Commands: **${client.commands.size} \n**Users:** ${
            client.users.cache.size
          } \n**Servers:** ${client.guilds.cache.size} \n**Channels:** ${
            client.channels.cache.size
          }`
        )
        .setFooter({ text: "Kaori©"})
        message.channel.send({ embeds: [embed] });
    },
  })