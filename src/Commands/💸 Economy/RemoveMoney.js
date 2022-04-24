const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const colour = require("../../config/assets/Json/colours.json")
const emote = require("../../config/assets/Json/emotes.json")
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'remove-money',
    description: 'Remove money from someones balance.',
    type: 'Text',
    aliases: ["remove_money", "rmoney"],
    userPermissions: "",
    owner: true,
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000, 
    nsfw: false,
    maintance: true,

    async run(message, args, client) {

        let member = message.mentions.members.first()
        if(!member) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emote.Error} MISSING ARGUEMENT`)
            .setDescription("*Waa~* please mention a user you are removing Meji from!")
    ]})
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

        let moni = (args[2])
        if(!moni) return message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emote.Error} AN ERROR OCCURED`)
            .setDescription(`*Bakaa~* Please provide how much Meji you are removing from ${member}`)]})
            if(moni > ecoData.wallet) {
                return message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setTitle(`${emote.Error} AN ERROR OCCURED`)
                .setDescription(`*Bakaa~* They dont have **$${moni}**`)
            ]})
        }

            await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: -moni}}) 

        const workedEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${member.user.username}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true})}`, url: `${message.url}`})
        .setDescription(`Removed Meji from <@${member.user.id}>'s balance\n **-${moni}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
        .setFooter({ text: `Remove Meji from balance!`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
        .setColor(colour['light red'])

        message.channel.send({ embeds: [workedEmbed]})
	},
})