const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const c = require("../../config/assets/Json/colours.json")
module.exports = new Command({
        name: "kick",
        description: "kick a user",
        userPermissions: ["KICK_MEMBERS"],
        botPermissions: "SEND_MESSAGES",
        type: "TEXT",
        cooldown: 10000,
        async run(message, args, client) {
    const member = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])
    const errorX = "<:Ikix:904736839036993586>"

    const Nomember = new Discord.MessageEmbed()
    .setColor("#FCC8EA")
    .setDescription("*Bakaa~* You did not mention a user for me to kick!")
    .setTitle(`${errorX} MISSING ARGUEMENT`)
    

        let clientUserBan = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Waa~* Why are you trying to kick me?")
        .setTitle(`${errorX} An Error Occured`)

        let AuthorrBan = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Waa~* Why are you trying to kick yourself?")
        .setTitle(`${errorX} An Error Occured`)

        let roleUnder = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Bakaa~* My role is under that user's role!\n Please move my role to the top of the roles list!")
        .setTitle(`${errorX} An Error Occured`)

        let sameroletarget = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Bakaa~* You have same the role level as who you are trying to kick!")
        .setTitle(`${errorX} An Error Occured`)



        let roleOver = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Bakaa~* Their role is higer than your role.")
        .setTitle(`${errorX} An Error Occured`)


        let roleSame = new Discord.MessageEmbed()
        .setColor(c['light red'])
        .setDescription("*Waa~* They have the same role as me!")
        .setTitle(`${errorX} An Error Occured`)

     if (!member) return message.reply({embeds: [Nomember]})
    if (member.user === client.user) return message.reply({embeds: [clientUserBan]})
    if (member.user === message.author) return message.reply({embeds: [AuthorrBan]})
    if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.reply({embeds: [roleUnder]})
    if (member.roles.highest.position === message.member.roles.highest.position) return message.reply({embeds: [sameroletarget]})
    if (member.roles.highest.position > message.member.roles.highest.position) return message.reply({embeds: [roleOver]})
    if (member.roles.highest.position === message.guild.me.roles.highest.position) return message.reply({embeds: [roleSame]})
    const reason = args.slice(2).join(" ") 
    const noReason = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("*Bakaa~* Please provide a reason to why this user is being kicked!")
    .setTitle(`${errorX} MISSING ARGUEMENT`)

    if(!reason) return message.reply({embeds: [noReason]})
    if(member.kickable === false) return message.reply('I am unable to kick this member')


    const Banned = new Discord.MessageEmbed()
    .setAuthor({ name: `${member.user.username} has been banned`, iconURL: message.author.displayAvatarURL()})
    .setColor("#F87E6D")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField("Reason:", `\`${reason}\``)
    .setFooter({ text: `Banned by ${message.author.username}`})
    .setTimestamp()


    const ConfirmToBanEmbed = new Discord.MessageEmbed()
    .setColor(c.pink)
    .setTitle(`Are you sure you wish to ban ${member.user.username}`)
    .setDescription(`Do you wish to ban ${member.user.username}?`)
    .addField("Reason to ban:", `> ${reason}`)
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
    message.channel.send({embeds: [ConfirmToBanEmbed], components: [row]})

    collector.on('collect', async (m) => {
        if(m.user.id !== message.author.id) return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(c['light red'])
            .setTitle(`${errorX} AN ERROR OCCURED`)
            .setDescription(`This interaction is not for you!`)
        ]})
        if (m.customId === 'accept') {
            member.kick({reason: reason || 'No Reason Specified.'})
            a.setDisabled(true)
            b.setDisabled(true)
            row = new Discord.MessageActionRow().addComponents(a, b)
            m.update({embeds: [Banned], components: [row]})
            client.channels.cache.get("924889631303012363").send({embeds: [Banned]})  
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
 
