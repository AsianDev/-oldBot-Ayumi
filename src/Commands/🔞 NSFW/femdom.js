const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'femdom',
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
           "https://cdn.discordapp.com/attachments/516059858924208138/902570300145807429/image2.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/945255608142151740/70834faa486e32530ce8f84a4f7fa4dba8f8216f.jpeg",
           "https://cdn.discordapp.com/attachments/516059858924208138/940909457020420116/0b0722acdbdf1cd6d7b249565e53499b.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/925680072151678996/666718-1511989205-239f9222cfdda80a6ccd7b050acf5f03.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/925679675043352576/666717-1511989204-2113d1ef18440b2ab41ff15ba7053e4b.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/892161504642760754/4jyVK5m.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/891760932064202762/Screenshot_20210926-1906122.pnghttps://cdn.discordapp.com/attachments/516059858924208138/891760932064202762/Screenshot_20210926-1906122.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/891760852481490954/Screenshot_20210926-1947472.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/891760852867371008/Screenshot_20210926-1948052.png",
           "https://cdn.discordapp.com/attachments/516059858924208138/869283745000210452/image0-1-1.jpg"
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
