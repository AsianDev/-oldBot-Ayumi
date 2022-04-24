const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const moment = require('moment')

module.exports = new Command({

    name: 'emojiinfo',
    aliases: ['ei', 'emoji-info'],
    description: 'Get info on a emoji',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "MANAGE_EMOJIS_AND_STICKERS"],
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        const regex = args[1].replace(/^<a?:\w+:(\d+)>$/, '$1');

        const emoji = message.guild.emojis.cache.find((emj) => emj.name === args.join(" ") || emj.id === regex);
        if (!emoji) return message.channel.send('Please send a valid custom emoji from this server only!');

        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? emotes.Tick : emotes.Error;

        const embed = new Discord.MessageEmbed()
        .setDescription(`${emotes.Tick} **Emoji Information!**\n<:Kao_ReplyCont:940971017826893844> Emoji name: \`${emoji.name}\`\n <:Kao_ReplyCont:940971017826893844> Emoji link: [Click here](${emoji.url})\n <:Kao_ReplyCont:940971017826893844> Emoji Animated:  ${checkOrCross(emoji.animated)}\n <:Kao_ReplyCont:940971017826893844> Managed: ${checkOrCross(emoji.managed)} \n<:Kao_Reply:940971041621180437> Emoji Id: \`${emoji.id}\``)    
        .addField("<:Kao_ReplyCont:940971017826893844> Created At:", `<:Kao_Reply:940971041621180437> ${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')}`)
        .addField("Useable by:", `${emoji.roles.cache.map((role) => role.name).join(', ') || '@everyone'}`)
        .setColor(colour.pink)
        .setThumbnail(emoji.url)
        .setFooter({ text: `Added by ${authorFetch.name}`})

        return message.channel.send({embeds: [embed]});
    }

    
})
