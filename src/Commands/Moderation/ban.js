const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
    name: "ban",
    description: "ban a user",
    cooldown: 10000,
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    aliases: ["banhammer", "bann", "ban-user"],
    async run(message, args, client) {
    const target = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])
    const member = message.author;
    const errorX = "<:Ikix:904736839036993586>"

    const Nomember = new Discord.MessageEmbed()
    .setColor("#FCC8EA")
    .setDescription("*Bakaa~* You did not mention a user for me to kick!")
    .setTitle(`${errorX} MISSING ARGUEMENT`)
    
     if (!target) return message.reply({embeds: [Nomember]})
    if (target.user === client.user) return message.reply('Waaa~~~ why are you trying to ban me?')
    if (target.user === message.member.user) return message.reply('Bakaa~ dont ban yourself')
    if (target.roles.highest.position > message.guild.me.roles.highest.position) return message.reply('My role is under that members role')
    if (target.roles.highest.position === message.member.roles.highest.position) return message.reply(`Your highest role position is the same as the targeted member's highest role`)
    if (target.roles.highest.position > message.member.roles.highest.position) return message.reply(`Their role position is higher than your highest role`)
    if (target.roles.highest.position === message.guild.me.roles.highest.position) return message.reply('Their highest role is the same position as mine')
    const reason = args.slice(2).join(" ") 
    const noReason = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("*Bakaa~* Please provide a reason to why this user is being banned!")
    .setTitle(`${errorX} MISSING ARGUEMENT`)

    if(!reason) return message.reply({embeds: [noReason]})
    if(target.bannable === false) return message.reply('I am unable to ban this member')

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${target.user.username} has been banned`, iconURL: message.author.displayAvatarURL()})
        .setColor("#F87E6D")
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addField("Reason:", `\`${reason}\``)
        .setFooter({ text: `Banned by ${message.author.username}`})
        .setTimestamp()

        try {
            target.ban({days: 7, reason: reason}).then(
                message.reply({embeds: [embed]})
            )
            client.channels.cache.get("924889631303012363").send({embeds: [embed]})

        }catch(err) {
            const NobanEmbed = new Discord.MessageEmbed()
            .setColor("#F87E6D")
            .setDescription(`I am unable to ban ${target}. Please make sure you have the correct permissions and my role is at the top of the roles list.`)
            .setTitle(`${errorX} An error occured`)
            message.reply({embeds: [NobanEmbed]})
        }
    }    
})