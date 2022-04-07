const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'rob',
    aliases: ['steal'], 
    description: 'Rob someone of their meji!',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 4000,
    nsfw: false,
    
    async run(message, args, client) {

        let user = message.mentions.members.first()
        if (user.id === message.author.id) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("Are you stupid?\n You cant rob yourself??")
    ]})

        if (user.bot) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Waa~* please mention a **user** you are trying to rob Meji from!")
    ]})

        if(!user) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Waa~* please mention a user you are trying to rob Meji from!")
    ]})

    let ecoData;
    try {
        ecoData = await DB.findOne({
            userID: user.id,
            MyID: message.author.id
        });
    } catch (err) {
        console.log(err);
    }
    if(!ecoData) {
        let ecoDB = await DB.create({
            userID: user.id,
            MyID: message.author.id
        });
        ecoDB.save();
    }

    if(ecoData.wallet < 500) {
        return message.reply({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription(`*Bakaa~* ${user.tag} doesnt even have 500 meji! \n Leave the poor guy alone!`)
        ], allowedMentions: {repliedUser: false}})
    }


        let successRob = Math.floor(Math.random() * 700) + 1
        if(successRob == null) successRob = 0

        let failRob = Math.floor(Math.random() * 830) + 1
         if(failRob == null) failRob = 0

        const success = [
            `${message.author.username} pickpockets ${user.username} and got away with ${successRob} Meji!`,
            `You knocked ${user.username} out and took ${successRob} Meji!`
     ]
        
        const fails = [
            `You were caught! You lost ${failRob} Meji!`
        ]

        const both = [success, fails]
        const random = both[Math.floor(Math.random() * both.length)]
        const randum = random[Math.floor(Math.random() * both.length)]

        let beggerEmbed = new Discord.MessageEmbed()
        .setColor(colour.brown)
        
        if(success.includes(randum)) {
            await DB.findOneAndUpdate({userID: user.id}, {$inc: {wallet: -successRob}}) 
            await DB.findOneAndUpdate({ MyID: message.author.id}, {$inc: {wallet: successRob}}) 
            ecoData.save()

            beggerEmbed.setDescription(`\`\`\`${randum}\`\`\`\n **+${successRob}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
            beggerEmbed.setFooter({ text: `Successful Rob`, iconURL: `${user.displayAvatarURL({ dynamic: true })}`})
            message.channel.send({embeds: [beggerEmbed]})

        } else if(fails.includes(randum)) {
            await DB.findOneAndUpdate({userID: user.id}, {$inc: {wallet: failRob}})
            await DB.findOneAndUpdate({ MyID: message.author.id}, {$inc: {wallet: -failRob}}) 
            ecoData.save()
            beggerEmbed.setDescription(`\`\`\`${randum}\`\`\`\n **+${failRob}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
            beggerEmbed.setFooter({ text: `Failed robbery!`, iconURL: `${user.displayAvatarURL({ dynamic: true })}`})
            message.channel.send({embeds: [beggerEmbed]})

        }
    }
})
