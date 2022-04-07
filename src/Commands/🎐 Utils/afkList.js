const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')
const afkSchema = require("../../config/models/afk.js")
const colour = require("../../config/assets/Json/colours.json")
const { paginate } = require("../../Systems/PaginationSys")

module.exports = new Command({
    name: "afklist",
    description: "Display all Afk people in the guild",
    cooldown: 4000,
    userPermissions:  "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",  
    aliases: ["afk-list", "afks", "afk's", "afkpeople", "afk-people", 'ap'],

    async run(message, args, client) {

        const data = await afkSchema.find({ Guild: message.guild.id })

        let afkPpl = data.map((v, i) => {
          return `**${i+1}.** | **Member:** <@${client.users.cache.get(v.User).id}> | **Reason:** ${v.Reason} | **AFK Since:** <t:${Math.round(v.Date / 1000)}:R>`
        }).pager(5)
        if(!afkPpl) return client.errorEmbed(message, `*Sowwy~* no one is afk!`)

        const embedPages = afkPpl.map(page => {
          let afkListEmbed = new Discord.MessageEmbed()
          .setColor(colour.pink)
          .setTitle(`All AFK Members in ${message.guild.name}!`)
          .setDescription(`${page.join("\n\n")}`)
          .setThumbnail(`${client.user.displayAvatarURL()}`)

          return afkListEmbed
      });
      
      paginate(message, embedPages) 
    }
})