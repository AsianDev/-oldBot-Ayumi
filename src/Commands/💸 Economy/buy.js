const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")
const MejiShopItem = require("../../config/assets/Economy/items")

module.exports = new Command({

    name: 'buy',
    aliases: ['purchase'], 
    description: 'Buy something off the shop with Meji!',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    cooldown: 4000,
    nsfw: false,
    maintance: true,

    async run(message, args, client) {


        if(await DB.findOne( 
            { 
                userID: message.author.id, 
                isPassive: true
            }
        )) return client.errorEmbed(message, `*Waa~* Please exit out of passive mode to use this command!`);

        let member = message.author
        const nick = message.member.displayName || message.member.username ||  message.member.nickname

        const itemPurchase = args[1]
        if(!itemPurchase) return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setAuthor({ name: `${nick}`, iconURL: `${message.author.displayAvatarURL()}`, url: `${message.url}`})
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
                .setDescription(`*Waa~* please specify an item to buy!`)
                .setFooter({ text: ' ', iconURL: `${message.guild.iconURL()}`})
                .setTimestamp()     
               ]})

        let ecoData;
        try {
            ecoData = await DB.findOne({
                userID: member.id,
                inventory: MejiShopItem
            });
        } catch (err) {
            console.log(err);
        }
        if(!ecoData) {
            ecoData =  await DB.create({
                userID: member.id,
                inventory: {
                    [itemPurchase]: 1
                } 
            });
            ecoData.save()
        }

        const validItemPurchase = !!MejiShopItem.find((v) => v.name.toLowerCase() === itemPurchase.toLowerCase()) 
        if(!validItemPurchase) return message.reply({ allowedMentions: {repliedUser: false}, embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setAuthor({ name: `${nick}`, iconURL: `${message.author.displayAvatarURL()}`, url: `${message.url}`})
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription(`*Waa~* **${itemPurchase}** is not an item on the shop!`)
            .setFooter({ text: ' ', iconURL: `${message.guild.iconURL()}`})
            .setTimestamp()     
            ]})

        let price = MejiShopItem.find((v) => (v.name.toLowerCase()) === itemPurchase).price

        if(ecoData.wallet > price) {
            return message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
                .setDescription(`*Waa~* you dont have enough Meji!`)
            ]})
        }
        const params = {
            userID: member.id,
            inventory: MejiShopItem
        }

        DB.updateOne(params, async(err, data) => {
            if(data && data.inventory) {
                const alreadyBoughtItem = Object.keys(data.inventory).includes(itemPurchase);
                if(!alreadyBoughtItem) {
                    data.inventory[itemPurchase] = data.inventory[itemPurchase]+1;
                } else {
                    data.inventory[itemPurchase] = data.inventory[itemPurchase]++
                }
                console.log(data)
                await DB.findOneAndUpdate(params, data)
            } 
            await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: -price}}) 

            message.reply({allowedMentions: {repliedUser: false}, embeds: [new Discord.MessageEmbed()
                        .setColor(colour.lime)
                        .setTitle(`${emotes.Tick} Successful Purchase`)
                        .setDescription(`You have succesfully purchased **${itemPurchase}**`)
                        .addField("Removed Meji:", `$${price}`)
                        .setFooter({ text: `Do Ayu inventory to view your inventory`, iconURL: `${message.guild.iconURL()}`})
                        .setTimestamp()
                ]})

        })
    }
})
