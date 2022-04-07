const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'masturbate',
    aliases: ["finger", 'pleasure', 'masturbation'],
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
         "https://cdn.discordapp.com/attachments/462827627628199936/943255954340839514/ZZUSED_9.png",
         "https://cdn.discordapp.com/attachments/462827627628199936/918455785711861760/bce63c75ba26a3dee452f4d5d4284172.png",
         "https://cdn.discordapp.com/attachments/462827627628199936/884761868034539520/3790902.png",
         "https://cdn.discordapp.com/attachments/462827627628199936/868803456411009075/E7D0kQaX0AA0W6-.jpg",
         'https://cdn.discordapp.com/attachments/462827627628199936/866771583103402014/ousaka_ayane_toshishita_kanojo_drawn_by_nakatama_kyou__2b0996235b2c2a09405a60c965454a38.jpg',
         'https://cdn.discordapp.com/attachments/462827627628199936/856725223372750888/3d4936c8-2448-4d58-bd6c-56b0f2e163eb.png',
         'https://cdn.discordapp.com/attachments/462827627628199936/852595057897898104/Eox4FCxUYAMaQqy_jpg_large.jpg',
         'https://media.discordapp.net/attachments/462827627628199936/849491004289187850/unknown.png?width=580&height=497',
         'https://cdn.discordapp.com/attachments/462827627628199936/847124307632062474/B68.jpg',
         'https://cdn.discordapp.com/attachments/462827627628199936/831486119052705873/image0.jpg',
         'https://cdn.discordapp.com/attachments/459900301156155422/948155617003073566/violet-project-qt-Project-QT-Nutaku-artist-7134216.gif',
         'https://cdn.discordapp.com/attachments/462827627628199936/823366712002609172/ZuyMDLm.png',
         'https://cdn.discordapp.com/attachments/462827627628199936/815523573317632020/0e8ada47cc72ddb49b1461b4746aad332b843eac32047291f7a96842bb696f8d.gif',
         'https://cdn.discordapp.com/attachments/462827627628199936/808328039531806740/20210208_062725.jpg',
         'https://cdn.discordapp.com/attachments/462827627628199936/804410050608365569/9d1ebcf492abfa5898d1dfa501df7642.jpg',
         'https://cdn.discordapp.com/attachments/462827627628199936/956312452851695676/3130376_-_1bf4b57503b89b189a72704d825c5aac.jpeghttps://cdn.discordapp.com/attachments/462827627628199936/953078001489281074/9Cloud.us_0248-Img_20190709_160803.jpg',
         'https://cdn.discordapp.com/attachments/462827627628199936/931455032564539402/i_1642091386717.jpeg',
         'https://cdn.discordapp.com/attachments/462827627628199936/931261662126800906/FI_tXtOX0AUx_zW.png',
         'https://cdn.discordapp.com/attachments/462827627628199936/930773752134914068/FIwdXN1WQAAEV8t.png',
         'https://cdn.discordapp.com/attachments/462827627628199936/930667957850349578/6e56535988264cfbc819ccbf0dd42770.jpg'
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
