const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const { create } = require("sourcebin")
module.exports = new Command({

    name: 'sourcebin',
    aliases: ['upload-bin', "bin", 'source-bin'], 
    description: 'Upload a command to a sourcebin',
    type: "Text",
    userPermissions: 'SEND_MESSAGES',
    botPermissions: 'ADMINISTRATOR',
    cooldown: 4000,
    dev: true,

    async run(message, args, client) {

        let contentCode = args.slice(1).join(" ");
        if(!contentCode) {
            return message.reply({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['angel white'])
                .setDescription("*Waa~* Please provide the code to upload to the sourcebin!")
                ]})
        }
        const datenow = Date.now()
        const timestp = Math.floor(datenow / 1000)

        create([
            {
                name: 'SourceBin',
                content: "Thanks for using this command!",
                language: 'javascript'

            }
        ], 
        {
                title: `Sourcebin - via ${client.user.username}`,
                description: `Made with ${client.user.tag}`

        }
        ).then((value) => {

            let SourceBinLink = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setStyle("LINK")
                .setURL(`${value.url}`)
                .setLabel("Open Link:")
                )
                .addComponents(
                    new Discord.MessageButton()
                    .setDisabled(true)
                    .setCustomId("Disabled")
                    .setLabel(`ID: ${value.key}`)
                    .setStyle("SECONDARY")
                    )

            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setDescription(`<:Iki_xpinkdot:916869194400796772> \`${message.author.tag}\`\n<:Iki_xpinkdot:916869194400796772> <t:${timestp}:R>`)
                .setURL(`${value.url}`)
                .setTitle(`Sourcebin - via ${client.user.username}`)
                .setTimestamp()
                .setThumbnail("https://cdn.discordapp.com/attachments/935232281025576990/938759652030689331/dave.png")
            ], components: [SourceBinLink]})
        })

    }
})

