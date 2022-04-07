const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const c = require("../../config/assets/Json/colours.json")
const e = require("../../config/assets/Json/emotes.json")
module.exports = new Command({

        name: "kick",
        description: "kick a user",
        userPermissions: ["KICK_MEMBERS"],
        botPermissions: [
            "SEND_MESSAGES",
            "KICK_MEMBERS",
            "ATTACH_FILES",
            "EMBED_LINKS"
        ],
          type: "Text",
        cooldown: 7000,

        async run(message, args, client) {

    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])

    const Nomember = new Discord.MessageEmbed()
    .setColor("#FCC8EA")
    .setDescription("*Bakaa~* You did not mention a user for me to kick!")
    .setTitle(`${e.Error} MISSING ARGUEMENT`)
    

        let clientKick = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Waaa~* Why are you trying to kick me?")
        .setTitle(`${e.Error} AN ERROR OCCURED`)

        let Authorrkick = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Waaa~* Why are you trying to kick yourself?")
        .setTitle(`${e.Error} AN ERROR OCCURED`)

        let roleUnder = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Bakaa~* My role is under that user's role!\n Please move my role to the top of the roles list!")
        .setTitle(`${e.Error} AN ERROR OCCURED`)

        let sameroletarget = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Bakaa~* You have same the role level as who you are trying to kick!")
        .setTitle(`${e.Error} AN ERROR OCCURED`)



        let roleOver = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Bakaa~* Their role is higer than your role.")
        .setTitle(`${e.Error} AN ERROR OCCURED`)


        let roleSame = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Waaa~* They have the same role as me!")
        .setTitle(`${e.Error} AN ERROR OCCURED`)

        if (!member) return message.reply({embeds: [Nomember]})
        if (member.user === client.user) return message.reply({embeds: [clientKick], allowedMentions: {repliedUser: false}})
        if (member.user === message.author) return message.reply({embeds: [Authorrkick], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.reply({embeds: [roleUnder], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position === message.member.roles.highest.position) return message.reply({embeds: [sameroletarget], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position > message.member.roles.highest.position) return message.reply({embeds: [roleOver], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position === message.guild.me.roles.highest.position) return message.reply({embeds: [roleSame], allowedMentions: {repliedUser: false}})

    const reason = args.slice(2).join(" ") 
    const noReason = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("*Bakaa~* Please provide a reason to why this user is being kicked!")
    .setTitle(`${e.Error} MISSING ARGUEMENT`)

    if(!reason) return message.reply({embeds: [noReason]})
    if(member.kickable === false) return message.reply('I am unable to kick this member')

    const kickned = new Discord.MessageEmbed()
    .setAuthor({ name: `${member.user.username} has been kicked`, iconURL: message.author.displayAvatarURL()})
    .setColor("#F87E6D")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField("Reason:", `\`${reason}\``)
    .setFooter({ text: `kickned by ${message.author.username}`})
    .setTimestamp()


    const ConfirmTokickEmbed = new Discord.MessageEmbed()
    .setColor(c.pink)
    .setTitle(`Are you sure you wish to kick ${member.user.username}`)
    .setDescription(`Do you wish to kick ${member.user.username}?`)
    .addField("Reason to kick:", `> ${reason}`)
    .setTimestamp()
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)

    let a = new Discord.MessageButton()
    .setCustomId('accept')
    .setStyle('SECONDARY')
    .setLabel("Confirm")
    .setEmoji("916869194400796772")

    let b = new Discord.MessageButton()
    .setCustomId('decline')
    .setLabel("Cancel")
    .setStyle('SECONDARY')
    .setEmoji("916869194400796772")

    let row = new Discord.MessageActionRow().addComponents(a, b)
    const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
    message.channel.send({embeds: [ConfirmTokickEmbed], components: [row]})

    collector.on('collect', async (m) => {
        if(m.user.id !== message.author.id) return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(c['light red'])
            .setTitle(`${e.Error} AN ERROR OCCURED`)
            .setDescription(`This interaction is not for you!`)
        ]})
        if (m.customId === 'accept') {
            member.kick({reason: reason || 'No Reason Specified.'})
            a.setDisabled(true)
            b.setDisabled(true)
            row = new Discord.MessageActionRow().addComponents(a, b)
            m.update({embeds: [kickned], components: [row]})

            const DB = require("../../config/models/loggerDB.js")

            const Data = await DB.findOne({
                GuildID: message.guild.id,
            });
            const logsChannel = message.guild.channels.cache.get(Data.Logs);
            logsChannel.send({embeds: [kickned]}) 
            
        } else if (m.customId === 'decline') {
            a.setDisabled(true)
            b.setDisabled(true)
            row = new Discord.MessageActionRow().addComponents(a, b)
            m.update({embeds: [new Discord.MessageEmbed()
                .setColor(c['light red'])
                .setTitle("Cancelled confirmation!")
                .setDescription(`I have cancelled to kick ${member.user.tag}`)
                ], components: [row]})
          }

        })
    }
})     
 
