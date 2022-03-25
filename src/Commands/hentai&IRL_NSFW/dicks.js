const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'dicks',
    aliases: ['dick'],
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
            "https://cdn.discordapp.com/attachments/660949726333763625/935281550998798397/zzt9_13.jpg",
            "https://cdn.discordapp.com/attachments/660949726333763625/952052967056478228/F72DB9D6-ADF1-46DD-AC52-554147584FC2.jpeg",
            "https://cdn.discordapp.com/attachments/660949726333763625/946869551830794310/FMdHtaMXMAEC2xc.png",
            "https://cdn.discordapp.com/attachments/660949726333763625/899010984285454386/sample_2d90628840bc6a500f7916b9f4aed30d.jpg",
            "https://cdn.discordapp.com/attachments/660949726333763625/898592660913291305/sample_8f9aec3f3b0884b03f47d20ae5d4f3bf39d917ab.jpg",
            "https://cdn.discordapp.com/attachments/660949726333763625/892042945518264352/Gif_229.gif",
            "https://cdn.discordapp.com/attachments/660949726333763625/888922880270815232/E_cXdv9WUAA_mvR.jpg",
            'https://cdn.discordapp.com/attachments/660949726333763625/899012268497448971/006fffdc6c878c4be00b91dc4e4cc493.jpeg',
            'https://cdn.discordapp.com/attachments/660949726333763625/880673319416913940/img99.jpg',
            'https://cdn.discordapp.com/attachments/660949726333763625/829422931611484160/image0.jpg',
            'https://cdn.discordapp.com/attachments/660949726333763625/821276947182780456/image0.jpg',
            'https://cdn.discordapp.com/attachments/660949726333763625/813181174678552626/57ccfed6b600f583e8dde67d2e066d1c.png',
            'https://cdn.discordapp.com/attachments/660949726333763625/807139652808736828/jjs1texfulf61.png',
            'https://cdn.discordapp.com/attachments/660949726333763625/806195097012142100/24f720725ce7a9ee8dbc9c2e325d4a385e8c5ec6.jpeg',
            'https://cdn.discordapp.com/attachments/660949726333763625/805990533859246140/7dad10aab06b519deea59f5c3cabd9fc.jpeg',
            'https://cdn.discordapp.com/attachments/660949726333763625/804631925339455488/151.jpg',
            'https://cdn.discordapp.com/attachments/660949726333763625/802965662053433415/bdb2f4ca336fb7510b9bdf20cc32c83d.gif',
            'https://cdn.discordapp.com/attachments/660949726333763625/796312352542556180/cerberus_helltaker_drawn_by_powzin__sample-c0d8f22e2d516d29eb2e59986ece0b6c.jpg',
            'https://cdn.discordapp.com/attachments/660949726333763625/796312416853819392/original_drawn_by_xiangzi_box__sample-8b4a318439c271fc226ea7af3502283d.jpg',
            'https://cdn.discordapp.com/attachments/660949726333763625/787295294055383060/EpCUSRAWEAEwexI.png',
            'https://cdn.discordapp.com/attachments/660949726333763625/786767621239996426/342d768.png',
            'https://cdn.discordapp.com/attachments/660949726333763625/781614757987352584/fgo_mashu_bkk_1.jpg'
                ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
