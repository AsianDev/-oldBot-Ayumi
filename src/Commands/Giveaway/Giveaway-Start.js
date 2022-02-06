const Command = require('../../Handlers/Command.js')
const { MessageEmbed } = require('discord.js');
const ms = require('ms')
const Discord = require("discord.js")
const colours = require("../../config/assets/Json/colours.json")

module.exports = new Command({
    name: 'start',
    description: "start a giveaway",
    type: "TEXT",
    aliases: ["gstart", "giveawaystart", "startt", "tart"],
    cooldown: 5000,
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    
  async run(message, args, client) {

    const ga = new Discord.MessageEmbed()
    .setDescription("```🎉 Giveaway Example```")
    .addField('How to use the Giveaway commands', '```Kao start <channel> <time> <number of winners> <prize>```', false)
    .addField("Time format?", "\`\`\`s = seconds, h = hours, d = days, m = minutes\`\`\`\n\n [**Discord**](https://discord.gg/TQ3mTPE7Pf)")
    .setTimestamp()
    .setColor("RED")
    .setFooter({ text:` > Kaori • ${message.channel.name}`})

    const NoDm = client.channels.cache.get("925997925925011466")

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
    const duration = args[2]
    if(!channel) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
    if(!args[2]) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
    if(!args[2].endsWith("s")&&!args[2].endsWith("h")&&!args[2].endsWith("d")&&!args[2].endsWith("m")) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
    const time = ms(duration)
    if(isNaN(time)) return message.reply({ content: "*Waa~* please provide a valid time <a:YuiNoLike:912603324518391829>", allowedMentions: {repliedUser: false}}) 

    const WinnerCountEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("The max winner count is 20, please choose a number from 1 to 20.")

    let winnerCount = args[3]  
    if(winnerCount > 20) return message.reply({embeds: [WinnerCountEmbed], allowedMentions: {repliedUser: false}})
    if(isNaN(winnerCount)) return message.reply({ content: "*Waa~* please provide a number for the amount of winners <a:YuiNoLike:912603324518391829>", allowedMentions: {repliedUser: false}}) 
    let prize = args.slice(4).join(" ")
    if(!args[3]) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
    if(!args[4]) return message.reply({embeds: [ga], allowedMentions: {repliedUser: false}})
    
    const GiveawaybotEmbed = new MessageEmbed()
    .setTitle(`🎁 ${prize} Giveaway`)
    .setColor("RED")
    .setDescription(`React with 🎉 to enter!\n **${winnerCount}** Winner\n Hosted by: ${message.author}`)
    .addField("Vote for Bonus Entries:", "**[Vote here](https://top.gg/servers/873143392488525834)**", true)  
    .addField("Giveaway Started", `Winners: **${winnerCount}**`, true)
    .setFooter({ text:  `Ends at`})
    .setTimestamp(Date.now() + ms(args[2]))
     
    const msg = await channel.send({embeds: [GiveawaybotEmbed]}) 
    msg.react('🎉')

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;
    
      const peopleReacted = msg.reactions.cache.get("🎉").users.cache.map(m => m)
        for (let i = 0; i < peopleReacted.length; i++) {

            if(peopleReacted[i].id == client.user.id){
                peopleReacted.splice(i,1);
                continue;
            }}

        if(peopleReacted.length == 0) {
            const nonWinner = new MessageEmbed()
            .setColor(`${colours['light red']}`)
            .setTitle(`🎁 ${prize} Giveaway`)
            .setDescription(`**There are no winners, because no one participated!**`)
            .addField("Giveaway Link:", `\n**[Press here](${msg.url})**`)
             .setFooter({ text: `Giveaway hosted by ${message.author.tag}`})


           return msg.edit({embeds: [nonWinner], content: "<:Ikix:904736839036993586> **No one entered**"})
        }

             // if the winner count is higher then the members who joined the giveaway
             if(peopleReacted.length < winnerCount) {
                const notEWinner = new MessageEmbed()
                .setColor(`${colours['light red']}`)
                .setTitle(`🎁 ${prize} Giveaway`)
                .setDescription(`**There are no winners, because not enough people participated!**`)
                .addField("Giveaway Link:", `\n**[Press here](${msg.url})**`)
                 .setFooter({ text: `Giveaway hosted by ${message.author.tag}`})
    
    
               return msg.edit({embeds: [notEWinner], content: "<:Ikix:904736839036993586> **Not enough people entered**"})
            }

        for (let y = 0; y < winnerCount; y++) {
            inList = false;
            random = Math.floor(Math.random() * peopleReacted.length);
            for (let o = 0; o < winners.length; o++) {
                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }}
            if(!inList){
                winners.push(peopleReacted[random])}}
            var response = ``
            for (let y = 0; y < winners.length; y++) {
            response += `${winners[y]}`
               
            const Winnerembed = new MessageEmbed()
             .setColor("RED")
             .setTitle(`🎁 ${prize} Giveaway`)
             .setDescription(`React with 🎉 to enter!\n **${winnerCount}** Winner\n Hosted by: ${message.author}`)
             .addField("Vote for Bonus Entries:", "**[Vote here](https://top.gg/servers/873143392488525834)**", true)  
             .addField("Giveaway Ended", `Winner: ${response}`, true)
             .setFooter({ text:  `Ends at`})
             .setTimestamp(Date.now() + ms(args[2]))

            msg.edit({embeds: [Winnerembed], content: "**Giveaway Ended**"}) 
    
            const Congratulations = new Discord.MessageEmbed()
            .setColor(`${colours.pink}`)
            .setDescription(`Jump to the **[${prize}](${msg.url})** Giveaway!`)
            channel.send({embeds: [Congratulations], content: `Congratulations ${response}, you have won the **${prize}** Giveaway.`}) 


            const CongratulationSend = new Discord.MessageEmbed()
            .setDescription(`Your have won the **[${prize}](${msg.url})** Giveaway in **${message.guild.name}**`)
            .setTitle("🎁 You have won the giveaway.")
            .setColor(`${colours.pink}`)
            .setFooter({ text: "Congratulations | Ended at" })
            .setTimestamp(Date.now() + ms(args[2]))
            try {
            winners[y].send({embeds: [CongratulationSend], content: `🎁 Congratulations ${winners[y]}`})
        } catch(error) {
            console.log(error)
        } 
         }
        
    }, ms(args[2]));
    }
})