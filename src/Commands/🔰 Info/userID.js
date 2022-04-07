const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'userid',
    aliases: ['user-id', 'user_id'], 
    description: 'Check for a user ID',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        const user = message.mentions.members.first() || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) ||  message.guild.members.cache.find((u) => u.user.username.toLowerCase().includes(args.join(" ").slice(1) || u.user.tag.toLowerCase() === args.join(" ").slice(1))) || message.author

        message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(colour['angel white'])
            .setDescription(`> **ID:** ${user.id}`)
            .setTitle(`${emotes.Tick} Here is ${user.username}'s ID`)
        ]})
    }
})
