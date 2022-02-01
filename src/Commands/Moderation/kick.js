const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
    name: "kick",
    description: "kick a user",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    cooldown: 10000,
    async run(message, args, client) {
    const target = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])
   const member = message.author
   const errorX = "<:Ikix:904736839036993586>"

   const Nomember = new Discord.MessageEmbed()
   .setColor("#FCC8EA")
   .setDescription("*Bakaa~* You did not mention a user for me to kick!")
   .setTitle(`${errorX} MISSING ARGUEMENT`)

    if (!target) return message.reply({embeds: [Nomember]})
    if (target.user === client.user) return message.reply('I can\'t allow you to kick myself')
    if (target.user === message.member.user) return message.reply('I can\'t allow you to kick yourself')
    if (target.roles.highest.position > message.guild.me.roles.highest.position) return message.reply('Their highest role position is higher than my highest role')
    if (target.roles.highest.position === message.member.roles.highest.position) return message.reply(`Your role position is the same as theirs`)
    if (target.roles.highest.position > message.member.roles.highest.position) return message.reply(`Their role position is higher than your highest role`)
    if (target.roles.highest.position === message.guild.me.roles.highest.position) return message.reply('Their highest role is the same position as mine')
    const reason = args.slice(2).join(" ") || "Not provided"
    if (reason && reason.length > 512) return message.reply('The reason must be less than 512 characters')
    if (target.kickable === false) return message.reply('I am unable to kick this member')

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${target.user.username} has been kicked`, iconURL: message.author.displayAvatarURL()})
        .setColor("#F87E6D")
       .setThumbnail(target.displayAvatarURL({ dynamic: true }))
       .addField("Reason:", `\`${reason}\``)
       .setFooter({ text: `Kicked by ${message.author.username}`})
        .setTimestamp()
        try {
            target.kick(reason).then(
                message.reply({embeds: [embed]})
            )
            client.channels.cache.get("924889631303012363").send({embeds: [embed]})

            
        }catch(err) {
            const NobanEmbed = new Discord.MessageEmbed()
            .setColor("#F87E6D")
            .setDescription(`I am unable to kick ${target}. Please make sure you have the correct permissions and my role is at the top of the roles list.`)
            .setTitle(`${errorX} An error occured`)
            message.reply({embeds: [NobanEmbed]})
}}})