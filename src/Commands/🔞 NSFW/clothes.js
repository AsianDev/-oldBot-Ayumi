const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'clothes',
    aliases: ["clothing"],
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
           'https://cdn.discordapp.com/attachments/459900077759266817/902212533333676162/NH5xXdM.jpg',
           'https://cdn.discordapp.com/attachments/459900077759266817/902212539054714920/a55oi4cokpb21.jpg',
           'https://cdn.discordapp.com/attachments/459900077759266817/902212397199147018/1280x720.8.jpg',
           'https://cdn.discordapp.com/attachments/459900077759266817/900670688682201088/f313994e135e5ca8.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/956491972045049856/vs81Hq0.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/949018652420743168/20220303_105623.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/949018706137206835/20220303_105929.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/938485961980006400/zaphn-lingerie-rosaria-2-var1.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/938485962277789736/zaphn-summer-rosaria-var5.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/937417077600452628/yande.re_815770_sample_beidou_genshin_impact_bikini_eyepatch_genshin_impact_masaki_nanaya_paimon_genshin_impact_swimsuits_wet.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/935564527997689896/sample_5e5ef024f1dc062516a3a4aa7dc3d289.png',
           'https://cdn.discordapp.com/attachments/459900361289891841/927852142474166322/FILrvo0aIAEmmx6.png',
           'https://cdn.discordapp.com/attachments/459900361289891841/909022502125178910/Bikini_single_slip.png',
           'https://cdn.discordapp.com/attachments/459900361289891841/908435727379992576/FD73_sIX0AQ-ZQM.png',
           'https://cdn.discordapp.com/attachments/459900361289891841/903613518836805642/FC3VRb_WEAUEHGg.png',
           'https://cdn.discordapp.com/attachments/459900361289891841/898195305999261726/FBpqvY2UYAYoXAy.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/893024131627495424/Screenshot_20210912_222956.jpg',
           'https://cdn.discordapp.com/attachments/459900361289891841/868052779543986196/E67itahVIAYByHo.jpg',
           'https://cdn.discordapp.com/attachments/461319094512123904/951250375397228555/76ad2b965f374bf13e0b5cb7c1008a79.jpeg',
           'https://konachan.com/image/7539b13255bf7385d85163e4a9aec2fc/Konachan.com%20-%20307529%202girls%20ass%20azur_lane%20blush%20bra%20breasts%20cleavage%20foxgirl%20gloves%20katana%20long_hair%20military%20panties%20pantyhose%20ponytail%20scan%20skirt%20sword%20uniform%20weapon.png',
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
