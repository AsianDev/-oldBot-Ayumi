const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'tentacles',
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
            "https://cdn.discordapp.com/attachments/747347776358055976/955348890666823700/illust_70453389_20220319_095714.jpg",
            "https://cdn.discordapp.com/attachments/747347776358055976/924991597823803442/c7806beb776d9ad61050468c3f6e8.png",
            "https://cdn.discordapp.com/attachments/747347776358055976/924991467016056842/b9b758f716171d857a4a0dc306f15.jpg",
            "https://cdn.discordapp.com/attachments/747347776358055976/924991367699103754/7400d3c59c78ba60ec14e21ac67a3.png",
            "https://cdn.discordapp.com/attachments/747347776358055976/903341066848182372/68bc64f54c3ce970ca0fd0e111cfb03c_1.png",
            "https://cdn.discordapp.com/attachments/747347776358055976/903328117697962044/g5bm0udcsmv71.jpg",
            "https://media.discordapp.net/attachments/747347776358055976/899701092412178462/unknown.png?width=301&height=454",
            "https://cdn.discordapp.com/attachments/747347776358055976/881616312466554970/74923444_p2_master1200.jpg",
            "https://cdn.discordapp.com/attachments/747347776358055976/868543050492833822/8ff878449fbf6bb4619dec76a21226abacf421cd.jpg",
            "https://cdn.discordapp.com/attachments/747347776358055976/857661043902775326/011c07db546fc3df6f7212a287f037c5.png",
            "https://cdn.discordapp.com/attachments/747347776358055976/851803782908346458/sample_9503e8fc07602f4333fbd1e0c98634f1e3f83ad4.jpg",
            "https://cdn.discordapp.com/attachments/747347776358055976/849349735872725012/mp1sv09gcn271.png",
            "https://cdn.discordapp.com/attachments/747347776358055976/842659508844625980/205330b0df5d276829b373eb34e48b7b.png"
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
