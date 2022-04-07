const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const colour = require("../../config/assets/Json/colours.json")
const emote = require("../../config/assets/Json/emotes.json")
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'bal',
    description: 'Display your / others Meji balance',
    aliases: ["balance", "mybal", "meji"],
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: false,
    maintance: true,

    async run(message, args, client) {

        let member = message.mentions.members.first() || client.users.cache.filter((user) => user.username).get(args[1]) || client.users.cache.filter((user) => user.tag).get(args[1]) || client.users.cache.filter((user) => user.id).get(args[1]) || message.author

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

        message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(colour['light blue'])
            .setAuthor({ name: `${member.tag} Meji Balance`, iconURL: `${member.displayAvatarURL()}`, url: `${message.url}`})
            .setDescription(`<:Kao_ReplyCont:940971017826893844> **Wallet:** $${ecoData.wallet}\n <:Kao_Reply:940971041621180437> **Bank:** $${ecoData.bank}/ $${ecoData.bankSpace} \`${(ecoData.bank / ecoData.bankSpace * 100).toFixed(1)}%\``)
            .setTimestamp()
            .setFooter({ text: `UserID: ${member.id}`, iconURL: `${member.displayAvatarURL()}`})
        ]})
		
	},
})