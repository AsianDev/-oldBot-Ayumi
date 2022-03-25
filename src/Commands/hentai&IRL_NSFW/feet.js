const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'feet',
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
            "https://cdn.discordapp.com/attachments/459900234500407306/951061536506515466/FB_IMG_1640937522291.jpg",
            "https://cdn.discordapp.com/attachments/459900234500407306/947350113863471114/jabami_yumeko__black_nails__by_itachiuchihaz_de89nwh-414w.jpg",
            "https://cdn.discordapp.com/attachments/459900234500407306/945748969273839726/20220221_215311.jpg",
            "https://cdn.discordapp.com/attachments/459900234500407306/941698321519640637/unknown.png",
            "https://cdn.discordapp.com/attachments/459900234500407306/935587802396102686/IMG_20220125_183004_886.jpg",
            "https://cdn.discordapp.com/attachments/459900234500407306/929819854733713428/95317121_p0.png",
            "https://cdn.discordapp.com/attachments/459900234500407306/920923232641613844/1634938878565.jpg"
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
