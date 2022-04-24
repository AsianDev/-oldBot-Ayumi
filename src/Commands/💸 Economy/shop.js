const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const MejiShopItem = require("../../config/assets/Economy/items")
const { paginate } = require("../../Systems/PaginationSys")

module.exports = new Command({

    name: 'shop',
    description: 'Display economic shop',
    type: 'Text',
    userPermissions: 'SEND_MESSAGES',
    botPermissions: ["SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"],
    cooldown: 3000,
    nsfw: false,
    maintance: true,

    async run(message, args, client) {

        if(MejiShopItem.length === 0 || null) return message.reply({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Sowwy~* there is currently nothing for sale in the shop right now!")
            ]})
        
        const pages = MejiShopItem.map((v) => {
            return `<:Iki_xpinkdot:916869194400796772> 〢 **${v.emoji} ${v.name}** \n ${v.price} Meji \n <:Kao_Reply:940971041621180437> \`${v.description}\``
        }).pager(6);
        

        const embedPages = pages.map(page => {
            let shopEmbed = new Discord.MessageEmbed()
            .setColor(colour.pink)
            .setTitle(`${emotes.coin} Shop`)
            .setDescription(`Example: \`Ayu buy <item>\`\n\n ${page.join("\n\n")}`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)

            return shopEmbed
        });
        
        paginate(message, embedPages) 
    }
})
