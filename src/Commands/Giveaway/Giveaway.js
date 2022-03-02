const Command = require('../../Handlers/Command.js')
const { MessageEmbed } = require('discord.js');
const ms = require('ms')
const Discord = require("discord.js")
const colours = require("../../config/assets/Json/colours.json")
const emotes = require("../../config/assets/Json/emotes.json")

module.exports = new Command({
    name: 'giveaway',
    description: "start a giveaway",
    type: "TEXT", 
    aliases: ["gw", "give=away", "give-away", "g", "i"],
    cooldown: 5000,
    userPermissions: "",
    maintance: true,
    botPermissions: "SEND_MESSAGES",
    
  async run(message, args, client) {

    if(message.member.permissions.has("MANAGE_GUILD") || message.member.roles.cache.find(r=> r.name === "Giveaway Manager")) {

    const ga = new Discord.MessageEmbed()
    .setDescription("```🎉 Giveaway Example```")
    .addField('How to use the Giveaway commands', '```Kao giveaway <channel> <time> <number of winners> <prize>```', false)
    .addField("Time format?", "\`\`\`s = seconds, h = hours, d = days, m = minutes\`\`\`\n\n [**Discord**](https://discord.gg/TQ3mTPE7Pf)")
    .setTimestamp()
    .setColor("RED")
    .setFooter({ text:` > Kaori • ${message.channel.name}`})


        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        const duration = args[2]
        if(!channel) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
        if(!duration) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
        if(!duration.endsWith("s")&&!duration.endsWith("h")&&!duration.endsWith("d")&&!duration.endsWith("m")) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
        const time = ms(duration)
        if(isNaN(time)) return message.reply({ content: "*Waa~* please provide a valid time <a:YuiNoLike:912603324518391829>", allowedMentions: {repliedUser: false}}) 
    
        const WinnerCountEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("The max winner count is 20, please choose a number from 1 to 20.")
    
        let winnerCount = args[3]  
        if(winnerCount > 20) return message.reply({embeds: [WinnerCountEmbed], allowedMentions: {repliedUser: false}})
        if(isNaN(winnerCount)) return message.reply({ content: "*Waa~* please provide a number for the amount of winners <a:YuiNoLike:912603324518391829>", allowedMentions: {repliedUser: false}}) 
        let prize = args.slice(4).join(" ")
        if(!winnerCount) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
        if(!prize) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
        
        const GiveawaybotEmbed = new MessageEmbed()
        .setTitle(`🎁 ${prize} Giveaway`)
        .setColor("RED")
        .setDescription(`Press the button to enter!\n **${winnerCount}** Winner\n Hosted by: ${message.author}`)
        .addField("Vote for Bonus Entries:", "**[Vote here](https://top.gg/servers/873143392488525834)**", true)  
        .addField("Giveaway Started", `Winners: **${winnerCount}**`, true)
        .setFooter({ text:  `Ends at`})
        .setTimestamp(Date.now() + ms(args[2]))
        
        const JoinGiveawayButton = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("join-giveaway")
            .setEmoji("<:Iki_giveaway:916630367845355520>")
            .setLabel("Join!")
            .setStyle("PRIMARY")
        )
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("Check-participants")
            .setLabel("Enteries")
            .setStyle("PRIMARY")
        )

        var winners = [];  
        var RerolledWinners = [];
              
            const embedMessage = await channel.send({embeds: [GiveawaybotEmbed], components: [JoinGiveawayButton]})  
    
            const collector = embedMessage.createMessageComponentCollector({ componentType: 'BUTTON', time: time })
            let participants = [];
            collector.on("collect", i => {
                    if(i.customId === "join-giveaway") {
                    if(!participants.includes(i.user.id)) {
                    participants.push(i.user.id)
                    i.reply({ content: ":ψʕ•ᴥ•oʔ You joined the Giveaway!", ephemeral: true })
                    } else i.reply({ content: "*Bakaa~* You already joined this giveaway (─‿‿─)♡", ephemeral: true })
                }}) 

                const JoinGiveawayButtonDisabled = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setCustomId("giveaway-ended")
                    .setEmoji("<:Iki_giveaway:916630367845355520>")
                    .setLabel("Giveaway Ended!")
                    .setStyle("SECONDARY")
                    .setDisabled(true)
                )

                collector.on("end", async (i) => {
                               
                    const nonWinner = new MessageEmbed()
                    .setColor(`${colours['light red']}`)
                    .setTitle(`🎁 ${prize} Giveaway`)
                    .setDescription(`**There are no winners, because no one participated!**`)
                    .addField("Giveaway Link:", `\n**[Press here](${embedMessage.url})**`)
                     .setFooter({ text: `Giveaway hosted by ${message.author.tag}`})
        
                    if(participants.length == 0) embedMessage.edit({embeds: [nonWinner], content: "<:Ikix:904736839036993586> **No one entered**", components: [JoinGiveawayButtonDisabled]})
        
                    if(participants.length < winnerCount)  {
                        const notEWinner = new MessageEmbed()
                        .setColor(`${colours['light red']}`)
                        .setTitle(`🎁 ${prize} Giveaway`)
                        .setDescription(`**There are no winners, because not enough people participated!**`)
                        .addField("Giveaway Link:", `\n**[Press here](${embedMessage.url})**`)
                         .setFooter({ text: `Giveaway hosted by ${message.author.tag}`})
                    
                         embedMessage.edit({embeds: [notEWinner], content: "<:Ikix:904736839036993586> **Not enough people entered**", components: [JoinGiveawayButtonDisabled]})
                        }
        
                            for (let i = 0; i < winnerCount; i++) {
                                index = Math.floor(Math.random() * (participants.length - 1));
                                if (!winners.includes(participants[index])) {
                                winners.push(participants[index]);
                                } else i--;
                            }
                            
                            embedMessage.edit({embeds: [new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle(`🎁 ${prize} Giveaway`)
                                .setDescription(`Press the button to enter!\n **${winnerCount}** Winners\n Hosted by: ${message.author}`)
                                .addField("Vote for Bonus Entries:", "**[Vote here](https://top.gg/servers/873143392488525834)**", true)  
                                .addField("Giveaway Ended", `Winner: ${winners.map((z) => `<@${z}>`)}`, true)
                                .setFooter({ text:  `Ended at`})
                                .setTimestamp(Date.now() + ms(args[2])), 
                            ], content: "**Giveaway Ended**", components: []})
                            message.channel.send({embeds: [new Discord.MessageEmbed()
                                .setColor(colours['pale red'])
                                .setDescription(`Jump to the **[${prize}](${embedMessage.url})** Giveaway!`)
                            ], content: `Congratulations ${winners.map((z) => `<@${z}>`)}, you have won the **${prize}** Giveaway!`})


                            try {
                                winners.forEach(winner => {
                                    message.guild.members.cache.get(winner).send({
                                    embeds: [new Discord.MessageEmbed()
                                        .setDescription(`Your have won the **[${prize}](${embedMessage.url})** Giveaway in **${message.guild.name}**`)
                                        .setTitle("🎁 You have won the giveaway.")
                                        .setColor(`${colours.pink}`)
                                        .setFooter({ text: "Congratulations | Ended at" })
                                        .setTimestamp(Date.now() + ms(args[2]))], content: `🎁 Congratulations ${winners.map((z) => `<@${z}>`)}`
                                    })
                                    })
                            } catch(error) {
                                console.log(error)
                            }
                        })
                               
        } else { return message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(colours['pale red'])
            .setTitle("*Bakaa~~* You are missing permissions!")
            .setDescription("*Waa~* You dont have enough permissions or the required role to run this command!") 
            .addField("Requirements:", "Role name: \n `Giveaway Manager`")
            .addField("Or", "Permission: \n `MANAGE_GUILD`")   
            .setTimestamp()
     ],allowedMentions: {repliedUser: false} 
    })}
}}) 

   