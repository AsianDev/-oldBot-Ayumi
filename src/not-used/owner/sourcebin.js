const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../util/assets/Json/emotes.json')
const colour = require('../../util/assets/Json/colours.json')
const { create } = require("sourcebin")

module.exports = new Command({

    name: "bin",
    aliases: ['sourcebin'], 
    description: "put ur code into a sourcebin",
    type: "TEXT",
    userPermissions: '',
    botPermissions: "ADMINISTRATOR",
    owner: true,
    cooldown: 4000,

    async run(message, args, client) {

        const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("<:x_:904736839036993586> Sorry this command has been archieved.")
    .setURL("https://discord.gg/RskdM62jdD")
    .setDescription("This command has been disabled!")
    message.channel.send({embeds: [embed]})
    }})

//         const member = message.mentions.members.first() || message.channel
//         let noMember = new Discord.MessageEmbed()
//         .setColor(`${colour['light red']}`)
//         .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
//         .setDescription("*Waa~* please give me a user to send this source to!")
//         if(!member) return message.channel.send({embeds: [noMember]})

//         let name = "Code"

//         let codeContent = args.slice(1).join(' ');
//         let noCode = new Discord.MessageEmbed()
//         .setColor(`${colour['light red']}`)
//         .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
//         .setDescription("*Waa~* please give me some code!")
//         if(!codeContent) return message.channel.send({embeds: [noCode]})

       
//         create([
//             {            
//             name: `Code by: Sensei | 旭陽#6427`,
//             content: `${codeContent}`,
//             language: 'javascript'
//              }
//         ], {
//             title: `${name}`,
//             description: "Code by: Sensei | 旭陽#6427"
//         }
//     ).then((value) => {
//         const finalResultPosted = new Discord.MessageEmbed()
//         .setColor(`${colour.pink}`)
//         .setTitle("Sourcebin - via Kaori")
//         .setURL(`${value.url}`)
//         .setDescription(`<:Iki_xpinkdot:916869194400796772> \`\`${message.author.tag}\`\`\n<:Iki_xpinkdot:916869194400796772> <t:${Math.round(Date.now() / 1000)}:R> `)
//         .setTimestamp()
//         .setThumbnail("https://cdn.discordapp.com/attachments/935232281025576990/938759652030689331/dave.png")
//         let button = new Discord.MessageActionRow()        
//         .addComponents
//         (
//           new Discord.MessageButton()
//           .setURL(`${value.short}`)
//           .setLabel("Open link:")
//           .setStyle("LINK")
//         )   
//         .addComponents
//         (
//             new Discord.MessageButton()
//             .setCustomId("Id")
//             .setLabel(`ID: ${value.key}`)
//             .setStyle("SECONDARY")
//             .setDisabled(true)
//         )
//         member.send({embeds: [finalResultPosted], components: [button]})
//     })
//     }
// })
