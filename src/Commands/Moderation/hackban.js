const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const errorX = "<:Ikix:904736839036993586>"

module.exports = new Command({
    name: "hban",
    description: "ban a user",
    cooldown: 10000,
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    aliases: ["hackban", "forceban", "force-ban", "hackban"],
    async run(message, args, client) {

        const target = args[1]
        const reason = args.slice(2).join(" ")

        const noReason = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("*Bakaa~* Please provide a reason to why this user is being banned!")
        .setTitle(`${errorX} MISSING ARGUEMENT`)

        if(!reason) return message.reply({embeds: [noReason]})
        const member = message.author;

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${target.user.tag} has been banned`, iconURL: message.author.displayAvatarURL()})
        .setColor("#F87E6D")
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Reason:** \n ${reason}`)
        .setFooter({ text: `Banned by ${member}`})
        .setTimestamp()


        const Nomember = new Discord.MessageEmbed()
        .setColor("#FCC8EA")
        .setDescription("*Bakaa~* You did not mention a user for me to kick!")
        .setTitle(`${errorX} MISSING ARGUEMENT`)

        if(isNaN(target)) return message.reply('The user ID must be a number.')
         if (!target) return message.reply({embeds: [Nomember]})
        if (target.user === client.user) return message.reply('*Waaa~* why are you trying to ban me?')
        if (target.user === message.member.user) return message.reply('*Bakaa~* dont ban yourself!')
        client.users.fetch(target).then(async(user) => {
            await message.guild.members.ban(user.id, {reason: reason})

             message.channel.send({embeds: [bannedEmbed]})
             client.channels.cache.get("924889631303012363").send({embeds: [embed]})

            
        }).catch(err => {
            return message.reply({content: `An error occured: ${err}`, allowedMentions: {repliedUser: false}})
        }) 
        
        
    }})