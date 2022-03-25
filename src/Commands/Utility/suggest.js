const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js');
const colour = require("../../config/assets/Json/colours.json")
module.exports = new Command({

    name: 'suggest',
    description: "make a suggestion to your suggestion channel",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
type: "Text",
    aliases: ["suggestion", 'su', 'newidea', 's'],
    cooldown: 7000,

    async run(message, args, client){

      function generateRandomString(length) {
        var chars =
          "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
        
        const SuggestionID = generateRandomString(7);           
        IDNumber = `${SuggestionID}`;

        const guildConfig = require('../../config/models/guildConfig')

        const data = await guildConfig.findOne({guildId: message.guild.id})
        const channel = message.guild.channels.cache.find(c => c.id === data.suggestionChannel)

        let suggestionMessage = args.slice(1).join(' ');
        const nosuggestion = new Discord.MessageEmbed()
        .setColor(colour['pale red'])
        .setTitle("<:x_:904736839036993586> MISSING ARGUEMENT.")
        .setDescription("*Waa~* Please provide a suggestion!!")
        if(!suggestionMessage) return message.channel.send({embeds: [nosuggestion]})
        
        const suggestembed = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({  dynamic: true })}` })
        .setDescription(`**Suggestion:**\n${suggestionMessage}`)
        .setTimestamp()
        .setImage(message.attachments.first()?.proxyURL || null)
        .setThumbnail(`https://cdn.discordapp.com/attachments/938866521499906069/954939060055605328/SuggestionIcon.png`)
        .setFooter({ text
: `User ID: ${message.author.id} | ID: ${IDNumber}`})
        .setColor(colour.pink)
        
        const msg = await channel.send({embeds: [suggestembed]});
        msg.react("<:tick:904736864076955738>");
        msg.react("<:x_:904736839036993586>");


        let sentembed = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.author.username}`, iconURL:` ${message.guild.iconURL()}`})
        .setDescription(`The suggestion has been sent to the **[Suggestion channel](${msg.url})**`)
        .setColor("WHITE")
        .setTimestamp()
        .setFooter({ text
: `Suggestion ID: ${IDNumber}`})

        let msg2 = await message.channel.send({embeds: [sentembed]});

        setTimeout(() => msg2.delete(), 12000);

    }
});