const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "enlargeemoji",
    aliases: ['bigemoji', "big-emoji", "enlarge-emoji"], 
    description: 'enlarge an emoji',
    type: 'TEXT',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,

    async run(message, args, client) {

        const emoji = args[1];
        if (!emoji) {
          const embed = new Discord.MessageEmbed()
          .setColor(colour["light red"])
          .setDescription("*Waa~* Please provide an emoji!")
          .setTitle(`${errorX} MISSING ARGUEMENT`)  
          return message.channel.send({embeds: [embed]})
        }
        const parsedEmoji = Discord.Util.parseEmoji(emoji)
        if(parsedEmoji.id) {
                
            const exe = parsedEmoji.animated ? ".gif" : ".png"
            const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + exe}?=2048`
             const EnlargedEmojiEmbed = new Discord.MessageEmbed()
             .setImage(`${url}?=2048`)
             .setTimestamp()
             .setColor(colour['celestial blue'])
             .setDescription(`<:Iki_tick:904736864076955738> **Enlarged Emoji!**\n<:Kao_ReplyCont:940971017826893844> Emoji name: \`${parsedEmoji.name}\`\n <:Kao_ReplyCont:940971017826893844> Emoji link: [Click here](${url})\n <:Kao_Reply:940971041621180437> Emoji Id: \`${parsedEmoji.id}\``)    
             message.reply({embeds: [EnlargedEmojiEmbed], allowedMentions: {repliedUser: false}})
            }
    }
})
