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
              "1234567890.-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
          
          const random = generateRandomString(12); 
          
          password = `${random}`;

          const PasswordGen = new Discord.MessageEmbed()
          .setColor(colour.lightish_blue)
          .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
          .setDescription("You password has been generated:")
          .addField("Your Password:", `> ${password}`)
          .setFooter({ text: `Not smart to use these as your passwords.`, iconURL: `${client.user.displayAvatarURL()}`})

          message.channel.send({embeds: [PasswordGen]})

    }
})
