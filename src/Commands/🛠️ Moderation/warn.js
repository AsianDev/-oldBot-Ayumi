/**@format */

const Command = require('../../Handlers/Command.js')
const warndb = require('../../config/models/warndb.js');
const Discord = require("discord.js")

module.exports = new Command({
    name: "warn",
    description: "warn someone",
    userPermissions: ["KICK_MEMBERS"],
  botPermissions: "SEND_MESSAGES", 
    cooldown: 10000,
    type: "Text",
    async run(message, args, client) {

        const user = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])


        const mentionUser = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("<:Ikix:904736839036993586> AN ERROR OCCURED")
        .setDescription("*Bakaa~* please mention a user!")
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${client.user.displayAvatarURL()}`})

        const mentionauser = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("<:Ikix:904736839036993586> AN ERROR OCCURED")
        .setDescription("*Bakaa~* I can not give a warn to a npc. Please warn a user.")
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${client.user.displayAvatarURL()}`})

        if(user.user.bot) return message.channel.send({embeds: [mentionauser]})

        const reasonEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("*Bakaa~* you need to give a reason to why they are to be warned >\\<")

        if(!user) return message.reply({embeds: [mentionUser]})
        const reason = args.slice(2).join(" ")
        if(!reason) return message.reply({embeds: [reasonEmbed]})
        warndb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator: message.author.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

        })
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Warning Sent:")
        .setDescription(`${user} has been warned.`)
        .addField("Reason:", `\`\`\`${reason}\`\`\``)
        .setTimestamp()
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Warn given by: ${message.author.tag}`, iconURL: `${client.user.displayAvatarURL()}`})
        message.channel.send({embeds: [embed]})


        const dmWarn = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("You have been Warned:")
        .setDescription(`You have been warned in ${message.guild.name}.`)
        .addField("Reason:", `\`\`\`${reason}\`\`\``)
        .setTimestamp()
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Warn given by: ${message.author.tag}`, iconURL: `${client.user.displayAvatarURL()}`})

        try {
            user.send({embeds: [dmWarn]})
        } catch(error) {
            console.log(error)
        }


        client.channels.cache.get("924889631303012363").send({embeds: [embed]})

    }})
