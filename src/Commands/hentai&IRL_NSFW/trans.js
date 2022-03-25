const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'trans',
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
           "https://cdn.discordapp.com/attachments/660949974464593930/930768521548410900/zheng_0b1e0ae03ce831539ec9ea6468c50e41.png",
           "https://cdn.discordapp.com/attachments/660949974464593930/926844174572077066/RDT_20220102_0055573960291112748806695.jpg",
           "https://cdn.discordapp.com/attachments/660949974464593930/898934822968393738/unknown.png",
           "https://cdn.discordapp.com/attachments/660949974464593930/897449298231459930/sample_7179bba3107b6f9aaf275d1227345c04.jpg",
           "https://cdn.discordapp.com/attachments/660949974464593930/892436469342416986/sample_6109c25321256313a9af7a31465a8ff9.jpg",
           'https://cdn.discordapp.com/attachments/459901058945122318/956422413447462912/97084259_p1_master1200.webp',
           'https://cdn.discordapp.com/attachments/459901058945122318/941173891785715813/20220210_002558.jpg',
           'https://cdn.discordapp.com/attachments/459901058945122318/940717118062727228/20220208_180549.jpg',
           'https://cdn.discordapp.com/attachments/459901058945122318/936771238632763462/49ac0476810bf97cf87f2c83306cc8b8.jpeg',
           'https://cdn.discordapp.com/attachments/459901058945122318/935015057622982747/image1-2.jpg',
           'https://cdn.discordapp.com/attachments/459901058945122318/932746356928434196/illust_91000220_20220118_012855.png',
           'https://cdn.discordapp.com/attachments/459901058945122318/931217455253184522/68z8o1xv8gb81.png',
           'https://cdn.discordapp.com/attachments/459901058945122318/929756654759735326/20211230_223835.jpg'
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
