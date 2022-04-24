const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'lb',
    aliases: ['leaderboard', 'rich', 'richest', 'mejilb'], 
    description: 'Display top richest people!',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    cooldown: 4000,
    nsfw: false,
    maintance: true,

    async run(message, args, client) {


    }
})
