const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "apply",
    description: 'apply for a position as <> in your server',
    type: 'TEXT',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "ADMINISTRATOR",
    cooldown: 3000,
    nsfw: false,
    guildOnly: true,

    async run(message, args, client) {

        let confirmationEmbed = new Discord.MessageEmbed()
        .setColor(`${colour['light red']}`)
        .setTitle("Please Read And Select:")
        .setThumbnail(`${message.guild.iconURL()}`)
        .setDescription("Please press one of the following buttons below.")
        .addField("Confirm", "By confirming you will be procceded to dms. So please have your Dms enabled for public server")
        .addField("Cancel:", "By pressing `Cacel` this message will be deleted")
        .setFooter({text: "This means please enable dms on public for this server!"})

        let a = new Discord.MessageButton()
        .setCustomId('accept')
        .setStyle('SECONDARY')
        .setLabel("Confirm")
        .setEmoji("916869194400796772")

        let b = new Discord.MessageButton()
        .setCustomId('decline')
        .setLabel("Cancel")
        .setStyle('SECONDARY')
        .setEmoji("916869194400796772")
  
        let row = new Discord.MessageActionRow().addComponents(a, b)
        const collector1 = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
        const confirmationMessageSend = message.channel.send({embeds: [confirmationEmbed], components: [row]})

        const questions = [
            "",
            "",
            "",
            "",
          ];
          
          let collectCounter = 0;
          let endCounter = 0;
  
  
          const appStart = await message.author.createDM(questions[collectCounter++]);
          const channel = appStart.channel;

          collector1.on('collect', async (m) => {
            if(m.user.id !== message.author.id) return message.channel.send({embeds: [new Discord.MessageEmbed()
              .setColor(c['light red'])
              .setTitle(`${errorX} AN ERROR OCCURED`)
              .setDescription(`*Bakaa~* This interaction is not for you!`)
          ]})
              if (m.customId === 'accept') {
                a.setDisabled(true)
                b.setDisabled(true)
                collector1.on("collect", () => {
                if (collectCounter < questions.length) {
                channel.send(questions[collectCounter++])
                } else{
                    channel.send({embeds: [new Discord.MessageEmbed()
                      .setColor(colour.pink)
                      .setDescription("*Waa~* Thanks for submitting your application!")
                      .setThumbnail(`${client.user.displayAvatarURL()}`)  
                      .setTitle("Thanks for submitting!")
                    ]})
                    collector1.stop("fulfilled")
                  }
          }) 
                if (m.customId === 'decline') {
                a.setDisabled(true)
                b.setDisabled(true)
                row = new Discord.MessageActionRow().addComponents(a, b);
                await confirmationMessageSend.delete()
              }
          }})

          const appsChannel = client.channels.cache.get("") // application responses channel (gets all the responses here :))
          collector1.on("end", (collected, reason) => {
            if (reason === "fulfilled"){
              let index = 1.;
              const mappedResponse = collected.map((msg) => {
                return `${index++} ${questions[endCounter++]}\n <:Iki_xpinkdot:916869194400796772> ${msg.content}`
              })
              .join("\n\n");
  
             
                const ApplicationEmbed = new Discord.MessageEmbed()
                .setAuthor( { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true})} )
                .setDescription(mappedResponse)
                .setThumbnail(message.author.displayAvatarURL)
                .setColor(colour.pink)
                .setTimestamp(Date())
              appsChannel.send({embed: [ApplicationEmbed]})
            }
          })

    }
}) 
