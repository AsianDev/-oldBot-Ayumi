const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")
module.exports = new Command({

    name: 'withdraw',
    description: 'Withdraw Meji from your bank',
    type: 'Text',
    aliases: ["with"],
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: false,
    maintance: true,

    async run(message, args, client) {

        let member = message.author

        let ecoData;
        try {
            ecoData = await DB.findOne({
                userID: member.id
            });
        } catch (err) {
            console.log(err);
        }
        if(!ecoData) {
           ecoData = await DB.create({
                userID: member.id
            });
            ecoData.save();
        }


        const amountWithDrawing = Number(args[1])
        if(isNaN(amountWithDrawing)) return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
            .setDescription("*Waa~* The amount has to be a `number`!")
        ] })
        if(!amountWithDrawing) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
            .setDescription("*Waa~* please provide how much you will be withdrawing!")
        ]})
            if(amountWithDrawing > ecoData.bank) {
            return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription(`*Bakaa~* You dont have **$${amountWithDrawing}** \n Do \`\`Ayu bal\`\` to check your balance!`)
        ]})
    } 
        ecoData.wallet += amountWithDrawing
        ecoData.bank -= amountWithDrawing
        await ecoData.save()

        return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour.green)
            .setTitle(`${emotes.Tick} Successful Withdraw`)
            .setDescription(`Successfully withdrawn Meji from your bank!`)
            .addField("Withdrawn:", `$${amountWithDrawing}`, false)
            .addField("Wallet:", `$${ecoData.wallet}`, true)
            .addField("Bank:", `$${ecoData.bank}`, true)
        ]})

    }
})
