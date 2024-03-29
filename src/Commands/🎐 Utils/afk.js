const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')
const afkSchema = require("../../config/models/afk.js")
const colour = require("../../config/assets/Json/colours.json")
const emotes = require("../../config/assets/Json/emotes.json")
module.exports = new Command({
    name: "afk",
    description: "set you afk",
    cooldown: 7000,
    userPermissions: "SEND_MESSAGES",
    type: "Text",
    botPermissions: "SEND_MESSAGES",  
   aliases: ["brb", "gtg", "afk,", "brb,", "gtg,", 'p'],
    async run(message, args, client) {


        if(message.content.includes('@everyone')) return message.channel.send(`*Waaa~* **${message.author.username}** please dont do that.`)
        if(message.content.includes('@here')) return message.channel.send(`**${message.author.username}** dont be a baka and do that`)
        let member = message.author
        const NotenoughReasoning = new Discord.MessageEmbed()
        .setColor(`${colour["light red"]}`)
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)
        .setDescription("*Waaa~* Please Give a longer reason to your afk!")

        let Reason = args.slice(1).join(" ") || "None provided";
        if(Reason < 4) return message.reply({embeds: [NotenoughReasoning], allowedMentions: {repliedUser: false}})

        const AfkEmbed = new Discord.MessageEmbed()
        .setColor(colour["strong lime"])
        .setTitle("<a:AnimeWave:912596615028678656> You are now AFK!")
        .setDescription(`<a:Kao_loading:938867145331339264> | <@${message.author.id}> Sending a message will bring you back.`)
        .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})

        
        const AfkEmbed2 = new Discord.MessageEmbed()
        .setColor(colour["angel white"])
        .setDescription(`<a:Kao_loading:938867145331339264> | <@${message.author.id}> Sending a message will bring you back.`)
        .addField("Reason to AFK:", `${Reason}`)

        const params = {
            Guild: message.guild.id,
            User: message.author.id,
        }
        
        afkSchema.findOne(params, async(err, data) => {
            if(data) {
                return;
            } 
            if(!data) try {
                new afkSchema({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Reason: Reason,
                    Date: Date.now()
                }).save()
                try {
                   message.member.setNickname(`[AFK] ${message.member.displayName}`)
                    message.channel.send({embeds: [AfkEmbed2]})
                    message.react("<a:wave2:940572281711775744>")
                      } catch (error) {
                        message.channel.send({embeds: [AfkEmbed]})
                        console.log(error)
                        }
                } catch(err) {   
                console.log(err)
              }
            }
        )
    }
})