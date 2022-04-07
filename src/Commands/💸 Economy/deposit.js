const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'deposit',
    description: 'Deposit Meji into your bank',
    type: 'Text',
    aliases: ["dep"],
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
            let ecoDB = await DB.create({
                userID: member.id
            });
            ecoDB.save();
        }

        let amountDepositing = args[1]
        if (isNaN(args[1])) {
            if (args[1] == "max" || args[1] == "all") {
                if(!amountDepositing) return message.channel.send({ embeds: [new Discord.MessageEmbed()
                    .setColor(colour['pale red'])
                    .setTimestamp()
                    .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
                    .setDescription("*Waa~* please provide how much you will be depositing!")
                ]})
                let space = ecoData.bankSpace - ecoData.bank;
                    if (ecoData.wallet <= space) {
                        amountDepositing = ecoData.wallet;
                    } else if (ecoData.wallet > space) {
                        amountDepositing = ecoData.bankSpace - ecoData.bank;
                    }
                  } else {
                    return message.channel.send({embeds: [new Discord.MessageEmbed()
                        .setColor(colour['pale red'])
                        .setTimestamp()
                        .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
                        .setDescription("*Waa~* The amount has to be a `number`!")
                    ]})
                    }
                  } else {
                    if(args[1] > ecoData.wallet) {
                        amountDepositing = ecoData.wallet;
                    } else {
                      if (args[1] > ecoData.bankSpace) {
                        amountDepositing = ecoData.bankSpace;
                      } else {
                        if (args[1] <= ecoData.wallet && !isNaN(args[1])) {
                            amountDepositing = args[1];
                        }
                      }
                    }
                  }

        ecoData.wallet -= amountDepositing
        ecoData.bank += amountDepositing
        await ecoData.save()

        return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour.green)
            .setTitle(`${emotes.Tick} Successful Deposit`)
            .setDescription(`Successfully Deposited Meji to your bank!`)
            .addField("Deposited:", `$${amountDepositing}`, false)
            .addField("Wallet:", `$${ecoData.wallet}`, true)
            .addField("Bank:", `$${ecoData.bank}`, true)
        ]})
    }
})
