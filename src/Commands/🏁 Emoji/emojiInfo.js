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
        .setDescription(`**Emoji information**\n\nGeneral\n**❯ ID:** ${emoji.id}\n**❯ URL:** [Link to Emoji](${emoji.url})\n**❯ AUTHOR:** ${authorFetch.tag} (${authorFetch.id})\n**❯ TIME CREATED:** ${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')}\n**❯ ACCESSIBLE BY:** ${emoji.roles.cache.map((role) => role.name).join(', ') || '@everyone'}\n\nOther\n**❯ Requires Colons:** ${checkOrCross(emoji.requiresColons)}\n**❯ Deletable:** ${checkOrCross(emoji.deletable)}\n**❯ Animated:** ${checkOrCross(emoji.animated)}\n**❯ Managed:** ${checkOrCross(emoji.managed)} `)
        .setColor(colour.pink)
        .setThumbnail(emoji.url)

        return message.channel.send({embeds: [embed]});
    }

    
})
