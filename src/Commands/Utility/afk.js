const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')
const afkSchema = require("../../util/models/afk.js")
const colour = require("../../util/assets/Json/colours.json")
const emotes = require("../../util/assets/Json/emotes.json")
module.exports = new Command({
    name: "afk",
    description: "set you afk",
    cooldown: 7000,
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: ["ADMINISTRATOR"],
    aliases: ["brb", "gtg", "afk,", "brb,", "gtg,", "fk"],
    async run(message, args, client) {

        if(message.content.includes('@everyone')) return message.channel.send(`*Waa~* **${message.author.username}** please dont do that.`)
        if(message.content.includes('@here')) return message.channel.send(`**${message.author.username}** dont be a baka and do that`)

        const Reason = args.slice(1).join(" ") || "None provided";

        const NotenoughReasoning = new Discord.MessageEmbed()
        .setColor(`${colour["light red"]}`)
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)
        .setDescription("*Waa~* Please Give a longer reason to your afk!")

        if(Reason < 1) return message.reply({embeds: [NotenoughReasoning], allowedMentions: {repliedUser: false}})
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
    
                const AfkEmbed = new Discord.MessageEmbed()
                .setColor("#17A8DA")
                .setTitle("<a:AnimeWave:912596615028678656> You are now AFK!")
                .setDescription(`<a:Kao_loading:938867145331339264> | <@${message.author.id}> Sending a message will bring you back.`)
                .addField("Reason to AFK:", `${Reason}`)
                .setTimestamp()
                .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
                message.channel.send({embeds: [AfkEmbed]})
                } catch(err) {   
                console.log(err)
              }
            }
        )
    }
})