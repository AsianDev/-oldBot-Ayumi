const { MessageEmbed } = require('discord.js');
const Command = require('../../Handlers/Command.js')
const colour = require('../../config/assets/Json/colours.json')
const jsonQuotes = require("../../config/assets/Json/motivational.json")

module.exports = new Command({

    name: "motivate",
    aliases: ['motivate-quote', "motivation"], 
    description: "sends a motivational quote",
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,

    async run(message, args, client) {
        let member = message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) ||  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])

        const randomQuote = jsonQuotes.quotes[Math.floor((Math.random() * jsonQuotes.quotes.length))];

        if (!args[1]) {
            const quoteEmbed = new MessageEmbed()
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()})
                .setTitle(randomQuote.author)
                .setDescription(randomQuote.text)
                .setColor(`${colour.lightish_blue}`)
                .setTimestamp()
            return message.channel.send({embeds: [quoteEmbed]});
        }
         else if (args[1]) {
            const Quoteembed = new MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()})
            .setColor(`${colour['light green']}`)
            .setTitle(`${randomQuote.author} -`)
                .setDescription(`**${randomQuote.text}** \n\nBy ${message.member.displayName} to ${member.displayName}`)
                .setTimestamp()
            message.channel.send({embeds: [Quoteembed]})
         }
    }
})
