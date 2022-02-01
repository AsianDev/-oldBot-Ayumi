const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js');

module.exports = new Command({

    name: 'suggest',
    description: "make a suggestion to your suggestion channel",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    aliases: ["suggestion"],
    cooldown: 10000,

    async run(message, args, client, member, guild){

        const guildConfig = require('../../models/guildConfig.js')

        const data = await guildConfig.findOne({guildId: message.guild.id})
        const channel = message.guild.channels.cache.find(c => c.id === data.suggestionChannel)

        let suggestmessage = args.slice(1).join(' ');

        const nosuggestion = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("<:x_:904736839036993586> MISSING ARGUEMENT.")
        .setDescription("Please give a suggestion!")
        if(!suggestmessage) return message.channel.send({embeds: [nosuggestion]})
        
        const suggestembed = new Discord.MessageEmbed()
        .setTitle('A new suggestion has been made:')
        .setDescription(`${suggestmessage}`)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setFooter({ text: `Suggestion by: ${message.author.tag}`})
        .setColor('#FCAEEB')
        
        const msg = await channel.send({embeds: [suggestembed]});
        msg.react("<:tick:904736864076955738>");
        msg.react("<:x_:904736839036993586>");


        let sentembed = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.author.username}`, iconURL:` ${message.guild.iconURL()}`})
        .setDescription(`The suggestion has been sent to the **[Suggestion channel](${msg.url})**`)
        .setColor("WHITE")
        .setTimestamp()

        let msg2 = await message.channel.send({embeds: [sentembed]});

        setTimeout(() => msg2.delete(), 12000);
    }
});