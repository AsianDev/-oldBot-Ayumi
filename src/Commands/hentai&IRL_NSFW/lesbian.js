const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "lesbian",
    description: "A Nsfw Command",
    nsfw: true,
    userPermissions: "KICK_MEMBERS",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    type: "Text", 


    async run(message, args, client) {

        let random = [
           'https://cdn.discordapp.com/attachments/459901082978484224/935282114251874424/619a4a48916597ae88dd6c4ee0c10516.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/940074653727203368/20220206_211237.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/940074654079516732/20220206_211239.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/947981114193088512/sample_efcc184340da45312434813d7890870e.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/949241347540406322/bakarina-her-harem-my-next-life-as-a-villainess.webp',
           'https://cdn.discordapp.com/attachments/459901082978484224/949641304273461268/FM7iDdUXMAwFxyd.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/954466107182436402/FOJ5G-_X0AYwBI3.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/954466106490388520/FOJ5T-LXIAQyZ_q.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/916361110976884816/FFsCms2X0AoKzs5.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/916360384296935445/FFsK-MkX0AgRuNY.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/911685185198751744/FEp-X2ZXwAIIFr8.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/911685225128525945/FEp-X20WUAspXXY.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/911219970636144670/FEf0E51XIAEeRUz.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/910742384130785300/26cd6z6noxh51-1.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/905828949433651200/FDTBoMMXsAEVnoW.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/905828949433651200/FDTBoMMXsAEVnoW.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/901800008205103114/j_ZVEXyOwaD_5b8S7eSweSkc1AAZElOT4YFiF1XX0Lg.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/901800000739221594/b2alc1qx2cq71.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/895579465550266388/FBEJVWCVUAQpVjv.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/894964771605086228/FA7byVdWEAEa0oF.jpeg',
           'https://cdn.discordapp.com/attachments/459901082978484224/893361083694338118/06ced03995944214064b5d9613603ac7b571ffb8.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/893360992942166036/sample_bf0d3dcde91e20e1ab73ddf0c294509570515452.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/892165058333929482/1632751717206.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/879827892069077002/0a1tlq3dzvp56hr4yufb.gif',
           'https://cdn.discordapp.com/attachments/459901082978484224/879062512383975454/sample-2fba009d01619da0591e925c27d74d11.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/876873089185644555/E800oOtXMAE-WVV.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/874020678318292992/E8SnpcRWEAEGa3N.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/872744310502727710/fhqbww3z5hf71.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/872307432846671882/sample_4eee5fd79cb6f1d1d28180fb60322057.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/871124844522139668/sample_7bc6ea3cc7a3018aad229137a2d95590.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/868136752559317002/E6_LMgeWUAEaVBm.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/868138863686721576/image1.gif',
           'https://cdn.discordapp.com/attachments/459901082978484224/863131566262583336/RDT_20210709_0219531417723901013629591.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/858029879114465330/E32lrDUVIAco8Bj.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/857662057763045426/RDT_20210624_1211222498785216281022474.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/853435305121939456/997ae2519b62c81a221acaa1aeb00e5a.jpg',
           'https://cdn.discordapp.com/attachments/459901082978484224/852838306377891840/E3h-m4qVcAsQOLi.jpg',
           'https://cdn.discordapp.com/attachments/459900336895688725/949640072519634964/FNAL51_XsAUsHMV.png',
           'https://cdn.discordapp.com/attachments/459901082978484224/852596639905480725/ec6f1748c17aa4f742e43d23365f4003.jpg',
           'https://cdn.discordapp.com/attachments/459900301156155422/953547019929128970/tj0nNmV.gif'
        ]
   
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let NSFWEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setImage(result)
           .setFooter({ text: "Horni much", iconURL: `${message.guild.iconURL()}`})
   
           message.channel.send({embeds: [NSFWEmbed]})
       }
})
