const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'beg',
    aliases: ['begger'], 
    description: 'beg for some items',
    type: 'Text',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        if(await DB.findOne( 
            { 
                userID: message.author.id, 
                isPassive: true
            }
        )) return client.errorEmbed(message, `*Waa~* Please exit out of passive mode to use this command!`);

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

        let AddedToBalMoneyTotal = Math.floor(Math.random() * 50) + 1
        if(AddedToBalMoneyTotal == null) AddedToBalMoneyTotal = 0

        let RemovedMoni = Math.floor(Math.random() * 80) + 1
         if(RemovedMoni == null) RemovedMoni = 0

 
        const success = [
            `𝘈𝘳𝘢~ here take $${AddedToBalMoneyTotal} Meji`,
            `Here you go <@${message.author.id}>, i think you need some meji you poor thing.`
        ]
            
            const fails = [
                '𝘞𝘢𝘢~ You think im going to give you some Meji? \n No thanks im going to use this to boost!',
                '𝘚𝘰𝘸𝘸𝘺~~ I ran out of meji <a:kao_teehee:950219956971249674>'
            ]

            const both = [success, fails]
            const random = both[Math.floor(Math.random() * both.length)]
            const randum = random[Math.floor(Math.random() * both.length)]

            let beggerEmbed = new Discord.MessageEmbed()
            .setColor(colour.brown)
            if(success.includes(randum)) {
                await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: AddedToBalMoneyTotal}}) 
                beggerEmbed.setDescription(`\`\`\`${randum}\`\`\`\n **+${AddedToBalMoneyTotal}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
                beggerEmbed.setFooter({ text: `Added Meji to your balance!`, iconURL: `${member.displayAvatarURL({ dynamic: true })}`})
                message.channel.send({ embeds: [beggerEmbed] })

            } else if(fails.includes(randum)) {
                beggerEmbed.setDescription(`\`\`\`${randum}\`\`\`\n **-${RemovedMoni}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
                beggerEmbed.setFooter({ text: `Removed Meji from your balance!`, iconURL: `${member.displayAvatarURL({ dynamic: true })}`})
                message.channel.send({ embeds: [beggerEmbed] })
            }

    }
})
