const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'ass',
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
          "https://cdn.discordapp.com/attachments/459900096281313281/955853838080933888/63.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/955853907299545178/97.png",
          "https://cdn.discordapp.com/attachments/459900096281313281/954711724672548904/bb_kama_anastasia_and_kama_fate_and_1_more_drawn_by_sirosoil__sample-8e9937d3e07c4d5e189488af4624c557.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/953396490787770418/sample_35dd34dc04d54bf9a4aa200a1dbf962a.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/953396402325700648/sample_0b8616b1268ef2545109402aeefa8df5.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/953396402627702844/sample_2bb6857f9efc6eea786e930e63cb7f98.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/951158160855539713/20220309_102243.png",
          "https://cdn.discordapp.com/attachments/459900096281313281/950563677763932190/sample_ecf264188d3de65831570fa1d3618ba0.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/950563677520658472/sample_6085dbc2ac5a38cf4a5b5b03d1863f30.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/948536283045699604/Konachan.com_-_303207_ass_cropped_kase_daiki_nopan_original_school_uniform_skirt_skirt_lift_thighhighs.jpg",
          "https://cdn.discordapp.com/attachments/459900096281313281/948536429800206336/Konachan.com_-_300304_ass_blush_braids_brown_hair_drink_neocoill_pussy_red_eyes_thighhighs_twintails_uncensored_waifu2x_watermark_yunyun_konosuba.jpg",
          'https://cdn.discordapp.com/attachments/459900096281313281/956236071627292692/9Cloud.us_0398-5F190D053B262Htrzk1399_Post_Archive_Thumb.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956237068072255519/20220323_130425.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956352273045393458/1647845352806.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956352273326436383/1647583367340.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956408999002144778/RDT_20220324_1525338711296672850913251.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/952636025111449630/RDT_20220311_0553087645733751915535765.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/952636025337946192/original_drawn_by_love_cacao__9092b06dffc02c2dd10fcb4e5d166013.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/952636024067092500/IMG_9300.png',
          'https://cdn.discordapp.com/attachments/459900096281313281/956458776930680832/RDT_20220324_1844092601158829825752364.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956458836036821002/RDT_20220324_1717332965796676900197740.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956458852633690122/RDT_20220324_1732587959087957667389550.jpg',
          'https://cdn.discordapp.com/attachments/459900096281313281/956713837619458089/RDT_20220325_1123461665812851367273232.jpg',
          'https://cdn.discordapp.com/attachments/459900322458894336/955840542841896990/6.png',
          'https://cdn.discordapp.com/attachments/459900322458894336/943416881354797056/thicc-lingerie-milf.jpeg.jpg'
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
