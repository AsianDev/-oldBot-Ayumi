const Command = require('../../Structures/Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../Structures/models/loggerDB.js")
module.exports = new Command({

    name: 'setLogs',
    aliases: ['Logs', "set-logs"], 
    description: 'set the logs channel',
    type: 'TEXT',
    userPermissions: 'MANAGE_GUILD',
    botPermissions: 'ADMINISTRATOR',
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        if(!channel) return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
                .setDescription("*Sowwy* but... you need to mention the channel!")
        ]})
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("Success")
            .setCustomId("Succes")
            .setStyle("PRIMARY")
            .setDisabled(true)
            .setEmoji("916869194400796772")
        )

        const data = await DB.findOne({ GuildID: message.guild.id })

        if (!data) {
            try {
                const data1 = await DB.create({
                    GuildID: message.guild.id
                })
    
                await data1.updateOne({ Logs: channel.id })
                return message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(colour.lightish_blue)
                    .setTitle("Successfully set the logs channel. <a:exclamation_mark_red:915208461514604604>")
                    .setDescription(`**${message.author.username}** You have set the logging channel!`)
                    .addField("Logs:", `<@&${channel.id}>`)
                    .setURL("https://media1.tenor.com/images/8d189128d67c185a55462f5a77f9e825/tenor.gif")
                ], allowedMentions: {repliedUser: false}, components: [row]})
            
                } catch (error) {
                console.log(error)
            }
        } else if(data) {
            try {
                await data.updateOne({ Logs: channel.id })
                return message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(colour.lightish_blue)
                    .setTitle("Successfully set the logs channel. <a:exclamation_mark_red:915208461514604604>")
                    .setDescription(`**${message.author.username}** You have set the logging channel!`)
                    .addField("Logs:", `<@&${channel.id}>`)
                    .setURL("https://media1.tenor.com/images/8d189128d67c185a55462f5a77f9e825/tenor.gif")
                ], allowedMentions: {repliedUser: false}, components: [row]})
            } catch(error) {
                console.log(error)
            }
        } 


    }
})
