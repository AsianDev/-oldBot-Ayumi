const Command = require('../../Handlers/Command.js')
// const paginate = require('discordjs-button-pagination');
const { MessageButton, MessageEmbed } = require("discord.js")
const emotes = require("../../config/assets/Json/emotes.json")
const colour = require("../../config/assets/Json/colours.json")
const { paginate } = require("../../Systems/PaginationSys")

module.exports = new Command({
    name: "emojilist",
    aliases: ["emojis", "elist", "emolist", "emotelist", "e"],
    cooldown: 4000,
    description: "List all the emotes from the server.",
    type: "Text",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] ,

    async run(message, args, client) {

        const m = await message.reply({
            embeds: [new MessageEmbed()
                .setColor(`${colour.lightish_blue}`)
                .setDescription(`**Fetching emotes in this server** ${emotes.Bars_Loading}`)
                .setFooter({text: `This might take time`})], allowedMentions: {repliedUser: false}})

        let Emojis = [];
        let EmojisAnimated = []
        let EmojiCount = 0
        let Animated = 0
        let OverallEmojis = 0
        let embed = {}
        let embedslist = []

        function Emoji(id) {
            return client.emojis.cache.get(id).toString();
          }
          message.guild.emojis.cache.forEach((emoji) => {
            OverallEmojis++;
            if (emoji.animated) {
                Animated++;
                EmojisAnimated.push(`${Emoji(emoji.id)}│\`${emoji.id}\` - \`${emoji.name}\``)
            } else {
                EmojiCount++;
                Emojis.push(`${Emoji(emoji.id)}│\`${emoji.id}\` - \`${emoji.name}\``)
            }
        })

        if (!OverallEmojis > 1) return message.reply(`${emotes.Error} There are no emotes in this server.`)

        Emojis = Emojis.concat(EmojisAnimated)
        var i, j, temporary, chunk = 25;
        for (i = 0, j = Emojis.length; i < j; i += chunk) {
            temporary = Emojis.slice(i, i + chunk);
            embed[`${i / 25}`] = new MessageEmbed()
                .setAuthor({ name: `Emojis in ${message.guild.name} - [${OverallEmojis}]`, iconURL: message.guild.iconURL() ? `${message.guild.iconURL({ dynamic: true })}` : `${message.author.displayAvatarURL({ dynamic: true })}`})
                .setDescription(`${temporary.join(`\n`)}`)
                .setColor(colour['light red'])
        }
        for (let i = 0; i < (Object.keys(embed).length); i++) {
            embedslist.push(embed[i])
        }        
        // const button1 = new MessageButton().setCustomId('prev').setLabel('Previous').setStyle('PRIMARY');
        // const button2 = new MessageButton().setCustomId('next').setLabel('Next').setStyle('PRIMARY');
        // buttonList = [ button1, button2 ]
        // paginate(message, embedslist, buttonList);

        paginate(message, embedslist);

 3
        m.delete()
    }
})