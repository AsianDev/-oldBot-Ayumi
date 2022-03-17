const Discord = require("discord.js");
const Command = require('../../Structures/Handlers/Command.js')
const afkSchema = require("../../Structures/models/afk.js")
const colour = require("../../config/assets/Json/colours.json")
const emotes = require("../../config/assets/Json/emotes.json")
module.exports = new Command({
    name: "afklist",
    description: "set you afk",
    cooldown: 7000,
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    aliases: ["afk-list", "afks", "afk's", "afkpeople", "afk-people"],
    maintance: true,
    async run(message, args, client) {

        const data = await afkSchema.find({ GuildID: message.guild.id})

        let afkPpl = data.map((v, i) => `**${i+1}.** | **Member:** <@${client.users.cache.get(v.User).id}> | **Status:** ${v.Reason} | **AFK Since:** <t:${v.Date}:R>`)

        const afkListEmbed = new Discord.MessageEmbed()
        .setColor(colour.pink)
        .setTitle(`All AFK Members in ${message.guild.name}!`)
        .setDescription(`${afkPpl.join("\n")}` || "*Waaa~* No one is currently AFK!")
        .setF
        return message.reply({embeds: [afkListEmbed], allowedMentions: {repliedUser: false}})
    }
})