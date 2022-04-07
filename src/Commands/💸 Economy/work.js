const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const colour = require("../../config/assets/Json/colours.json")
const emote = require("../../config/assets/Json/emotes.json")
const DB = require("../../config/models/ecoDB")
const workedQuotes = require("../../config/assets/Json/work.json")

module.exports = new Command({

    name: 'work',
    description: 'work as your job',
    type: 'Text',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 7200000, // 2 hours
    nsfw: false,
    maintance: true,

  
    async run(message, args, client) {

        if(await DB.findOne( 
            { 
                userID: message.author.id, 
                isPassive: true
            }
        )) return client.errorEmbed(message, `*Waa~* Please exit out of passive mode to use this command!`);

        let member = message.mentions.members.first() || message.author;

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
        const AddedToBalMoneyTotal = Math.floor(Math.random() * 50) + 1
        if(AddedToBalMoneyTotal === 0) {
            AddedToBalMoneyTotal = 1
        } else if(AddedToBalMoneyTotal == null) AddedToBalMoneyTotal = 0
 
        await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: AddedToBalMoneyTotal}}) 
        var messages = workedQuotes[Math.floor(Math.random() * workedQuotes.length)]

        const workedEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${member.user.username}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true})}`, url: `${message.url}`})
        .setDescription(`\`\`\`${messages}\`\`\`\n **+${AddedToBalMoneyTotal}<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
        .setFooter({ text: `Added Meji to your balance!`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
        .setColor(colour.white)
        .setThumbnail(client.user.displayAvatarURL())
        
        message.channel.send({ embeds: [workedEmbed]})
	},
})