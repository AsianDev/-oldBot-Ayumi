const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    paginate: async function (msg, pages) {
        if(!pages) throw new Error("you should provide pages for this to work.")
    let page = 0
        

    let button1 = new Discord.MessageButton()
    .setEmoji('<:right_skip:931882733662273588>')
    .setStyle('PRIMARY')
    .setCustomId(`h220z1`)

    let button = new Discord.MessageButton()
    .setEmoji('<:left_arrow:915577873232982056>')
    .setStyle('PRIMARY')
    .setCustomId(`h220z`)

    let button2 = new Discord.MessageButton()
    .setEmoji(`<:right_arrow:915577801833336883>`)
    .setStyle('PRIMARY')
    .setCustomId(`2ewwecx`)

    let button3 = new Discord.MessageButton()
    .setEmoji(`<:left_skip:931882680323276850>`)
    .setStyle('PRIMARY')
    .setCustomId(`2ewwecx2`)

    let dibutton = new Discord.MessageButton()
    .setEmoji('<:left_arrow:915577873232982056>')
    .setStyle('PRIMARY')
    .setCustomId(`3`)
    .setDisabled(true)

    let dibutton2 = new Discord.MessageButton()
    .setEmoji('<:right_arrow:915577801833336883>')
    .setStyle('PRIMARY')
    .setCustomId(`h3`)
    .setDisabled(true)

    let button12 = new Discord.MessageButton()
    .setEmoji('<:right_skip:931882733662273588>')
    .setStyle('PRIMARY')
    .setCustomId(`h220z1`)
    .setDisabled(true)

    let button32 = new Discord.MessageButton()
    .setEmoji(`<:left_skip:931882680323276850>`)
    .setStyle('PRIMARY')
    .setCustomId(`2ewwecx2`)
    .setDisabled(true)


    let row = new MessageActionRow()
    .addComponents(button1, button, button2, button3)

    const changeFooter = () => {
        const embed = pages[page]
        const newEmbed = new Discord.MessageEmbed(embed)
        return newEmbed.setFooter({text: `Page ${page + 1}/${pages.length}`})
        }


        const cp =  await msg.channel.send({ embeds: [changeFooter()], components: [row]})
    const collector = cp.createMessageComponentCollector({ time: 120000})

    let dirow = new MessageActionRow()
    .addComponents(dibutton.setDisabled(true).setStyle("SECONDARY"), dibutton2.setDisabled(true).setStyle("SECONDARY"), button12.setDisabled(true).setStyle("SECONDARY"), button32.setDisabled(true).setStyle("SECONDARY"))

    collector.on('collect', async (b) => {
        if(b.user.id !== msg.author.id) {
            b.reply({ content: "*Waaa~* This is not for you.", ephemeral: true})
        } else {
            if(b.customId === "h220z1") {
                page = 0
            }
            if(b.customId === "h220z") {
                page = page > 0 ? --page : 0
            }
            if(b.customId === "2ewwecx") {
                page = page + 1 < pages.length ? ++page : pages.length - 1
            }
            if(b.customId === "2ewwecx2") {
                page = pages.length - 1
            }
            b.update({ embeds: [changeFooter()], components: [row]})
        }
    })
    collector.on('end', (b) => {
        cp.edit({ embeds: [pages[page]], components: [dirow]})
    })
    return cp
    }

}
        