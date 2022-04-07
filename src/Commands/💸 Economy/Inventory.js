const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")
const { paginate } = require("../../Systems/PaginationSys")
const MejiShopItem = require("../../config/assets/Economy/items")
const { ParseComma } = require("../../config/functions/parseComma")

module.exports = new Command({

    name: 'inventory',
    aliases: ['inv'], 
    description: 'Display your inventory',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        let member = message.author
        const nick = message.member.displayName || message.member.username ||  message.member.nickname
        
        let mapped;
        const findShopItem = (search) => MejiShopItem.find( arr => arr.name.toLowerCase() === search)

        const data = await DB.find({
            userID: member.id,
            inventory: MejiShopItem
        })
        
        if(!data) return message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emotes.Error} Inventory Error`)
            .setDescription(`You currently have purchased nothing`)
         ], allowedMentions: {repliedUser: false}})

            for(const [key, value] of Object.entries(data.inventory)) {
 
                mapped = Object.keys(data.inventory) 
                .sort((a, b) => {
                  return data.inventory[b] - data.inventory[a]
                })
                .map(key => {
                 let shopItems = MejiShopItem.find(value => value.name.toLowerCase() == key.toLowerCase())
                  return shopItems? `${shopItems.emoji} | **${key}**\`(${ParseComma(data.inventory[key])})\` \n <:reply:936267092808835102> **Type:** ${shopItems.catergory} \n` : ` **${key}** — ${data.inventory[key]}`
                }
            ).pager(7)
        }

        const embedPages = mapped.map(page => {
            let shopEmbed = new Discord.MessageEmbed()
            .setColor(colour.pink)
            .setAuthor({ name: `${nick}`, iconURL: `${message.author.displayAvatarURL()}`})
            .setDescription(`${page.join("\n\n")}`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)

            return shopEmbed
        });
        
        paginate(message, embedPages) 

    }
})
