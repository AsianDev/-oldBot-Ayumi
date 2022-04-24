const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const colour = require("../../config/assets/Json/colours.json")
const emote = require("../../config/assets/Json/emotes.json")
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'passive',
    description: 'Enable or disable passive mode',
    type: 'Text',
    aliases: [""],
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    cooldown: 4000, 
    nsfw: false,
    maintance: true,
    async run(message, args, client) {

        let member = message.mentions.members.first()

        let options = args.slice(2).join(' ')
        let array = ['enable', 'disable']

        if(!array.includes(options.toLowerCase())) {
            return client.errorEmbed(message, `*Waa~* please choose to either enable or disable passive mode!`);
        }

        if(options.toLowerCase() === 'enable') {
            try {
                let ecoData;

                ecoData = await DB.findOneAndUpdate({
                    userID: member.id,
                    isPassive: options
                });
                DB.save()
            } catch (err) {
                console.log(err);
            }
            message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor(colour.pink)
                .setTitle(`${emote.Tick} Update Success!`)
                .setDescription("<a:kao_teehee:950219956971249674> You have been set into passive mode!")
            ]})
        }

        if(options.toLowerCase() === 'disable') {
            try {
                let ecoData;

                ecoData = await DB.findOneAndUpdate({
                    userID: member.id,
                    isPassive: options
                }, async (err, data) => {
                    if(!data) client.errorEmbed(message, `*Bakaa~* Your not in passive mode!`)
                
                    message.channel.send({ embeds: [new Discord.MessageEmbed()
                        .setColor(colour.pink)
                        .setDescription("<a:kao_teehee:950219956971249674> You have been set out of passive mode!")
                        .setTitle(`${emote.Tick} Update Success!`)
                    ]})
                })  
              DB.save()

            } catch (err) {
                console.log(err);
            }
        }
    }
})