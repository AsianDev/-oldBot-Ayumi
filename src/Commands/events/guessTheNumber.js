const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../util/assets/Json/emotes.json')
const colour = require('../../util/assets/Json/colours.json')

module.exports = new Command({

    name: 'gtn',
    aliases: ["guessthenumber"], 
    description: "Start a gtn event!",
    type: "TEXT",
    userPermissions: "KICK_MEMBERS",
    botPermissions: "ADMINISTRATOR",
    cooldown: 4000,

    async run(message, args, client) {

        const EventChannel = message.mentions.channels.first()
        const maxNumber = args[2]
        if(maxNumber <= 10) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(`${colour['light red']}`)
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
                .setDescription("*Waa~* Please provide a number bigger than 10!")
                     ]})

        const noMaxNumber = new Discord.MessageEmbed()
        .setColor(`${colour['light red']}`)
        .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
        .setDescription("*Waa~* Please provide the max number!")
        .addField("Example:", "```yaml\n Syntax: Kao <channel> <number>```")
        if(!maxNumber) return message.channel.send({embeds: [noMaxNumber]})

        let max = args[2]
        let random = Math.floor(Math.random() * `${max}`) + 1
       
        const GtnRow = new Discord.MessageActionRow()        
        .addComponents(
          new Discord.MessageButton()
          .setURL("https://top.gg/servers/873143392488525834")
          .setLabel("Vote for Ikigai")
          .setStyle("LINK")
          )
        EventChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setColor(`${colour.pink}`)
            .setDescription(`Guess the number has begun in ${EventChannel}!`)
            .setTimestamp()
            .addField("How To Play:", `\`-\` Guess any number from 1 to ${maxNumber}\n\`-\` First person to guess the number wins!\n\`-\`You have unlimited guesses\n\`-\`Anyone can participate.`)
            .setTitle(`🎉 Guess the number 🔢`)
            .setFooter({ text: `Hosted by: ${message.author.tag}`})], components: [GtnRow]})
           const filter = (m) => parseInt(m.content) === parseInt(random)
          const collector = message.channel.createMessageCollector({
            filter
          });
      
          collector.on("collect", async (msg) => {
            if (msg.content == random) {
              EventChannel.send({embeds: [new Discord.MessageEmbed()
                .setColor(`${colour.pink}`)
                .setTitle(`🎉 Congratulations ${msg.member.user.username}`)
                .setFooter({ text: `Range: 1 - ${maxNumber}`})
                .setDescription("The number you have guess was right! The game has ended!")  
                .addField("Correct Number:", `\`${random}\``, true)
                .setTimestamp()
                .addField("Winner:", `<@${msg.member.user.id}>`, true)     
              ]}); 
            } else if (msg.content !== random) {
                return message.react(`${emotes.Error}`)
            }
            collector.stop("Winner");
          });
      
          collector.on("end", async (collected) => {
            console.log("GTN event has ended")
          });      

    }
})
