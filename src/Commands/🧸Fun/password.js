const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "password",
    aliases: ['passgen'], 
    description: 'make a password ig',
    userPermissions: 'SEND_MESSAGES',
  botPermissions: "SEND_MESSAGES",   cooldown: 4000,

    async run(message, args, client) {

        function generateRandomString(length) {
            var chars =
              "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()|/.@#!$%^&+><?;:~*";
            var random_string = "";
            if (length > 0) {
              for (var i = 0; i < length; i++) {
                random_string += chars.charAt(
                  Math.floor(Math.random() * chars.length)
                );
              }
            }
            return random_string;
          }
          
          const random = generateRandomString(18);           
          password = `${random}`;

          const PasswordGen = new Discord.MessageEmbed()
          .setColor(colour.lightish_blue)
          .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
          .setDescription("You password has been generated:")
          .addField("Your Password:", `> ${password}`)
          .setFooter({ text: `Not smart to use these as your passwords.`, iconURL: `${client.user.displayAvatarURL()}`})

          let confirmationEmbed = new Discord.MessageEmbed()
          .setColor(`${colour['light red']}`)
          .setTitle("Please Read And Select:")
          .setThumbnail(`${message.guild.iconURL()}`)
          .setDescription("Please press one of the following buttons below.")
          .addField("Dm's:", "Pressing Dm's means you will be sent your password. \nPlease make sure to have your dms on **public!**")
          .addField("Channel:", "Press Channel will result in your password being sent to this channel here.")

          let a = new Discord.MessageButton()
          .setCustomId('accept')
          .setStyle('SECONDARY')
          .setLabel("Dm's")
          .setEmoji("916869194400796772")
  
          let b = new Discord.MessageButton()
          .setCustomId('decline')
          .setLabel("Channel")
          .setStyle('SECONDARY')
          .setEmoji("916869194400796772")
    
          let row = new Discord.MessageActionRow().addComponents(a, b)
          const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
          message.channel.send({embeds: [confirmationEmbed], components: [row]})
  
          collector.on('collect', async (m) => {
            if(m.user.id !== message.author.id) return message.channel.send({embeds: [new Discord.MessageEmbed()
              .setColor(c['light red'])
              .setTitle(`${errorX} AN ERROR OCCURED`)
              .setDescription(`This interaction is not for you!`)
          ]})
              if (m.customId === 'accept') {
                a.setDisabled(true)
                b.setDisabled(true)
                  message.author.send({embeds: [PasswordGen]})
              }
              else if (m.customId === 'decline') {
                a.setDisabled(true)
                b.setDisabled(true)
                row = new Discord.MessageActionRow().addComponents(a, b)
                m.update({embeds: [PasswordGen], components: [row]})
              }
            })
    }
})
