const Command = require('../../Structures/Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'gtn',
    aliases: ["guessthenumber"], 
    description: "Start a gtn event!",
    type: "TEXT",
    userPermissions: "",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    owner: true,

    async run(message, args, client) {

        const EventChannel = message.channel;
        const maxNumber = parseInt(args[1])
        if(maxNumber <= 10) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(`${colour['light red']}`)
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
                .setDescription("*Waaa~* Please provide a number bigger than **10**!")
                     ]})

        const noMaxNumber = new Discord.MessageEmbed()
        .setColor(`${colour['light red']}`)
        .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
        .setDescription("*Waaa~* Please provide the max number!")
        .addField("Example:", "```yaml\n Syntax: Kao gtn <number>```")
        if(!maxNumber) return message.channel.send({embeds: [noMaxNumber]})

        let max = args[1]
        let random = Math.floor(Math.random() * parseInt(max))
        client.channels.cache.get("938846996817641542").send(`Guess the number Event started in ${EventChannel} and the number is || \`${random}\` || `)

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
            .addField("How To Play:", `\`-\` Guess any number from 0 to ${maxNumber}\n\`-\` First person to guess the number wins!\n\`-\`You have unlimited guesses\n\`-\`Anyone can participate.`)
            .setTitle(`🎉 Guess the number 🔢`)
            .setFooter({ text: `Hosted by: ${message.author.tag}`})], components: [GtnRow]})
       
            const filter = (m) => isNaN(m.content) === false
            const collector = message.channel.createMessageCollector({ filter: filter});
          collector.on("collect", async (msg) => {
            // console.log(msg)

            if (parseInt(msg.content) > maxNumber) {
              msg.delete();
            }
        else if (parseInt(msg.content) == random) {

              EventChannel.send({embeds: [new Discord.MessageEmbed()
                .setColor(`${colour.pink}`)
                .setTitle(`🎉 Congratulations ${msg.member.user.username}`)
                .setFooter({ text: `Range: 0 - ${maxNumber}`})
                .setDescription("The number you have guessed was right! The game has ended!")  
                .addField("Correct Number:", `\`${random}\``, true)
                .setTimestamp()
                .addField("Winner:", `<@${msg.member.user.id}>`, true)     
              ]}); 
        }
            // collector.stop("Winner");
          });
      
          collector.on("end", async (collected) => {
            console.log("GTN event has ended")
          });      
    }
})
