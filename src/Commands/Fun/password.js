const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../util/assets/Json/emotes.json')
const colour = require('../../util/assets/Json/colours.json')

module.exports = new Command({

    name: "password",
    aliases: ['passgen'], 
    description: 'make a password ig',
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,

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
          .setTitle("Do you wish to be sent your password?")
          .setThumbnail(`${client.user.displayAvatarURL()}`)
          .setDescription("Please press one of the following buttons below.")
          .addField("Accept:", "Pressing accept means you will be sent your password. \nPlease make sure to have your dms on **public!**")
          .addField("Decline:", "Press decline will result in your password being sent to this channel here.")

          let a = new Discord.MessageButton()
          .setCustomId('accept')
          .setStyle('SECONDARY')
          .setLabel("Accept")
          .setEmoji("916869194400796772")
  
          let b = new Discord.MessageButton()
          .setCustomId('decline')
          .setLabel("Decline")
          .setStyle('SECONDARY')
          .setEmoji("916869194400796772")
    
          let row = new Discord.MessageActionRow().addComponents(a, b)
          const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
          message.channel.send({embeds: [confirmationEmbed], components: [row]})
  
          collector.on('collect', async (m) => {
              if (m.customId === 'accept') {
                  message.author.send({embeds: [PasswordGen]})
                  a.setDisabled(true)
                  b.setDisabled(true)
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
