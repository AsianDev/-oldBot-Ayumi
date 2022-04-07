const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'hentai',
    aliases: ["vanilla"],
    description: "A Nsfw Command",
    userPermissions: "KICK_MEMBERS",
     botPermissions: "SEND_MESSAGES",
    cooldown: 4000,  
    type: "Text", 
    nsfw: true,

    async run(message, args, client) {

        let random = [
            'https://cdn.discordapp.com/attachments/459900077759266817/951556101948715038/1044.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/948302361351294996/FMx0579XsAAa_ET.png',
            'https://media.discordapp.net/attachments/459900077759266817/948302361955287100/FMxE45zX0AADa2i.png?width=352&height=498',
            'https://cdn.discordapp.com/attachments/459900077759266817/948302359975587840/FMyFiZmXsAco0_N.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/948270734126489620/IMG_20220302_002551.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/947817988353060874/FMg53TtXsAM0YXT.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/947817987417710602/FMrb8bbXIAIuuhi.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/947379481105010728/Polish_20220227_132004048.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/947379480526204928/Polish_20220227_132251845.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/946729183294423080/Rhea_01Cbcccccbf355ece5257a9b9eb419c405f.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/946267232999202837/sample_f2505a31bd0daadc31a2f042d7d55aef57225283.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/945732953516937297/FMNDJPhWYAEbh8L.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/945732951923122316/FMNIisQXEAABf9x.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/944770256193331320/pic_219.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/943257208513237112/ZZUSED_1.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/942616963191021568/bo8i3wl2gau51.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/941838243924680704/FLV9VMsX0AI4VtZ.png',
            'https://cdn.discordapp.com/attachments/459900361289891841/842231317000880208/lc9v3kme4py61.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/940587567995306004/FKxAj9eXsAsokI4.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/931647004281536543/FJE5uZ7X0AAr2Y3.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/931647003249746010/FJE5gq4WYAE6Ywe.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/931493692215296050/E0U3Vw4XoAggn2Q.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/925475030551392347/AkJvdfTVNFo.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/925474987530403870/1639259512738_i.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/925474976549716059/f1b8878f5bb36d65755e2bab715abd97.jpeg',
            'https://cdn.discordapp.com/attachments/459900077759266817/925474912334909490/maid9.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/925474847579058186/5db2df0447a5a5187401547.jpeg',
            'https://cdn.discordapp.com/attachments/459900077759266817/920287937189511178/sample_c52c167e41c791915e7ebd0fe2604742.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/920287926846390333/sample_07e303e1ceb40b8a1e9b5fedca747362.jpg',
            'https://cdn.discordapp.com/attachments/459900077759266817/918241236291289179/FGG8BCGWUAQ5XXa.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/911630569077604372/FEpPYjMX0AcqWTI.png',
            'https://cdn.discordapp.com/attachments/459900077759266817/908407671751835678/FD7Ucq8XsAkTjV6.png',
        ]


        var result = random[Math.floor(Math.random() * random.length)]

        let NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(result)
        .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})

        message.channel.send({embeds: [NSFWEmbed]})
    }
})
