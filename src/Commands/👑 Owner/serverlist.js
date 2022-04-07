const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const { paginate } = require("../../Systems/PaginationSys")

module.exports = new Command({

    name: 'serverlist',
    aliases: ['listservers', 'servers', 'server-list'], 
    description: 'list all the servers Ayumi is in',
 type: "Text",
    userPermissions: '',
    botPermissions: 'ADMINISTRATOR',
    cooldown: 4000,
    owner: true,

    async run(message, args, client) {

        

    }
})
