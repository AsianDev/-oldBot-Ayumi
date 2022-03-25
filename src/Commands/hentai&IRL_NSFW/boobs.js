const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "boobs",
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: true,
    type: "Text", 

    async run(message, args, client) {

        let random = [
           'https://cdn.discordapp.com/attachments/459900301156155422/945753333623304203/e9ivx36onip61.gif',
           'https://cdn.discordapp.com/attachments/459900301156155422/945753334650916864/tledusbi7r371.gif',
           'https://cdn.discordapp.com/attachments/459900301156155422/941416418342207528/5a8b5fa0695b8fdc6d771cdbd5caa263.gif',
           'https://cdn.discordapp.com/attachments/459900301156155422/935282334356344883/zzt9.gif',
           'https://cdn.discordapp.com/attachments/459900301156155422/933951447945596978/USED_7.gif',
           'https://cdn.discordapp.com/attachments/459900301156155422/930199665838817310/tumblr_pc9wnr46Er1ubr8nvo1_400.gif',
           'https://cdn.discordapp.com/attachments/459900391899922442/955690622063362078/sample_b730e4501d6448110c65fdc2a085220d.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/955130679094566912/yande.re_547690_sample_animal_ears_breast_grab_breasts_masanaga_tsukasa_nipples_no_bra_open_shirt_tail_touhou_yakumo_ran.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/954467546248130592/FOJ3yM3XEAUtFmE.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/954466182440837230/FOJ5G_YWQAYuT3G.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/954467544184541214/FOJ3yM1XIBYRiyb.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/953811235210674266/FB_IMG_1646274564456.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/953274845448273960/FMz8TMXWQAAxt4X.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/952061814072569866/IMG_20220312_112730.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/951313532845178900/17f71c401469-8b61652dc1c6a4a090d9f62db1f088b5bbef65bc-429_message_421601336022562_1646880218838.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/949677333126721617/FM7kJ1jXMAQ-AXt.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/948302371002409051/FMxGq32XIAE7QU3.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/948302372105486366/FMxDWF1X0Asw-wZ.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/947817961832460318/FMg4xWLXoAA8OgL.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/945732926585339984/FMNL_i5XIAAGkLf.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/945573499496431696/RDT_20220221_2307246950670475394509973.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/945573499739734046/elf2.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/944329519043579924/20220212_215901.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/943866664112508968/21.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/942033515384561664/FLZMVhhWUAUmzlk.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/941308547587801128/FLFILZvXEAkwUi4.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/940580435967234118/FKxWtDHXsAghmLe.png',
           'http://www.hentai69.comunidades.net/1799711521/104_hentaititsgif.gif',
           'https://i0.wp.com/25.media.tumblr.com/8d11e7ee449fdbed103483176b8428b2/tumblr_mkh80fkqaB1s5fe8vo1_500.gif',
           'https://64.media.tumblr.com/17c90e3977eb37326f6e0a7a775b8e85/tumblr_nld351R3E81rat3p6o1_400.gif',
           'https://media1.tenor.com/images/b39184f87b9aa30284ef11cb83f3cb13/tenor.gif?itemid=18859890',
           'https://64.media.tumblr.com/3fb81d500ec413ba42dc232c83ff4918/c9ff1259ca2570e2-94/s640x960/5f12765b78d86807859e4d9d25a4eb1414b297a6.gif',
           'http://www.hentai69.comunidades.net/1799711521/103_hentai_boobs.gif',
           'https://i.pinimg.com/originals/8c/7e/0b/8c7e0b005c3bb587645b21d863916e99.gif',
           'https://49.media.tumblr.com/89f22b9ef7a30cc95374e70a271094eb/tumblr_nati6okjnX1tj40lyo1_500.gif',
           'https://cdn.discordapp.com/attachments/459900391899922442/938111428462805052/uuAyK0dKzZWUZJIblnMyh2q4eUYFyvLIx8M7UeREmB8.pnghttps://cdn.discordapp.com/attachments/459900391899922442/460969324530892801/akagi_kantai_collection_drawn_by_shinama__babfc0bdd5163f0e22c24b9cfe33d6a7.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/460969620950482944/3Rn40e.png',
           'https://cdn.discordapp.com/attachments/459900391899922442/460969810063261707/2aWOS1g.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/461329655539171370/gambier_bay_kantai_collection_drawn_by_toppiroki__sample-7af4ea67824c24dce795ec928a220a10.jpg',
           'https://cdn.discordapp.com/attachments/459900391899922442/471461316549410816/unknown.png'
         ]
 
 
         var result = random[Math.floor(Math.random() * random.length)]
 
         let NSFWEmbed = new Discord.MessageEmbed()
         .setColor("RANDOM")
         .setImage(result)
         .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})
 
         message.channel.send({embeds: [NSFWEmbed]})
    }
})
