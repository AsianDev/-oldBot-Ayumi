const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const colour = require("../../config/assets/Json/colours.json")
const emote = require("../../config/assets/Json/emotes.json")
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'pay',
    description: 'Pay someone with Meji',
    type: 'Text',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
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

        let member = message.mentions.members.first()
        if(!member) return message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setTimestamp()
                .setTitle(`${emote.Error} MISSING ARGUEMENT`)
                .setDescription("*Waa~* please mention a user you are paying!")
        ]})
        if(message.mentions.members.first()?.id === message.author.id) return message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTimestamp()
            .setTitle(`${emote.Error} AN ERROR OCCURED`)
            .setDescription("*Sowwy* but you cant pay yourself with Meji!")
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

        const moni = args.slice(2).join(' ')
        if(!moni || isNaN(moni)) return message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setTitle(`${emote.Error} AN ERROR OCCURED`)
                .setDescription(`*Bakaa~* Please provide how much Meji you are paying ${member}`)]})
        if(moni > ecoData.wallet) return message.channel.send({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setTitle(`${emote.Error} AN ERROR OCCURED`)
                .setDescription(`*Bakaa~* You dont have **$${moni}** \n Do \`\`Ayu bal\`\` to check your balance!`)]})
 
        await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: moni}}) 

        ecoData.wallet -= moni
        await ecoData.save()

        const workedEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${member.user.username}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true})}`, url: `${message.url}`})
        .setDescription(`Added Meji to <@${member.user.id}>'s balance\n **+${moni}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
        .setFooter({ text: `Added Meji to balance!`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
        .setColor(colour['light green'])

        message.channel.send({ embeds: [workedEmbed]})
        try {
            member.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour.green)
                .setDescription(`<@${message.author.id}> has paid you with some Meji! \n You now have **__$${ecoData.wallet}__**`)
                .addField("Server:", `${message.guild.name}`)
                .addField("Amount:", `$${moni}`)
                .setTitle(`${emote.Tick} Transfered Meji to your account!`)
            ]})
        } catch(error) {
            console.log(error)
        }
	},
})