const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const { paginate } = require("../../Systems/PaginationSys")

module.exports = new Command({

    name: 'btn',
    description: 'mhm',
 type: "Text",
    userPermissions: '',
  botPermissions: "SEND_MESSAGES",

  owner: true,

    async run(message, args, client) {

        const k = new Discord.MessageEmbed()
        .setDescription("Page 1")
        const e = new Discord.MessageEmbed()
        .setDescription("Page 2")
         const f = new Discord.MessageEmbed()
         .setDescription("Page 3")
         const g = new Discord.MessageEmbed()
         .setDescription("Page 4")

        let pages =[k, e, f, g]

        paginate(message, pages) 
    }
})
