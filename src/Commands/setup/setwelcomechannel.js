const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
const guildConfig = require('../../util/models/guildConfig.js')

module.exports = new Command({
    name: "welcomechannel",
    description: "Set the welcome channel.",
    type: "TEXT",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["ADMINISTRATOR"],
    cooldown: 10000,
    aliases: ["setwelcome", "set-welcome", "set-welc", "setwelcomechanel", "set-welcomechannel"],
    async run(message, args, client) {
    
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        const Nochannel = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Please mention the channel to set the welcome channel as!")
        .setThumbnail("<:Ikix:904736839036993586> MISSING ARGUEMENT!")
        if (!channel) return message.reply({embeds: [Nochannel]})
    
        const data = await guildConfig.findOne({ guildId: message.guild.id }) 
        let confirmation = new Discord.MessageEmbed()
            .setTitle(`Please Confirm`)
            .setDescription(`Are you sure, you want to set ${channel} as the Welcome Channel?`)
            .setColor("BLURPLE")

        let cancelled = new Discord.MessageEmbed()
            .setTitle(`Cancelled`)
            .setDescription(`Cancelled setting ${channel} as the Welcome Channel.`)
            .setColor("RED")

        let confirmed = new Discord.MessageEmbed()
            .setTitle(`Confirmed`)
            .setDescription(`${channel} has been set as the Welcome Channel.`)
            .setColor("GREEN")

        const confirmrow = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('yes')
                    .setEmoji("<:Iki_tick:904736864076955738>")
                    .setStyle('SUCCESS')
                    .setLabel("Confirm")

            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('no')
                    .setEmoji("<:Ikix:904736839036993586>")
                    .setStyle('DANGER')
                    .setLabel("Cancel")

            )
        const disabledrow = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('yes')
                    .setEmoji("<:Iki_tick:904736864076955738>")
                    .setStyle('SUCCESS')
                    .setLabel("Confirm")
                    .setDisabled(true)
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('no')
                    .setEmoji("<:Ikix:904736839036993586>")
                    .setStyle('DANGER')
                    .setLabel("Cancel")

                    .setDisabled(true)
            )
        if (!data) {
            try {
                const m = await message.reply({ embeds: [confirmation], components: [confirmrow] })
                const filter = (b) => { if (b.user.id === message.author.id) return true; return b.reply({ content: "<:Ikix:904736839036993586> This confirmation is not for you.", ephemeral: true }) };
                let collector = await m.createMessageComponentCollector({ filter: filter, time: 120000, max: 1 });

                collector.on('collect', async (i) => {
                    i.deferUpdate()
                    if (i.customId === 'yes') {
                        const data1 = await guildConfig.create({
                            guildId: message.guild.id
                        })

                        await data1.updateOne({ welcomeChannel: channel })
                        await m.edit({ embeds: [confirmed], components: [disabledrow] })
                        return;
                    }
                    else if (i.customId === 'no') {
                        await m.edit({ embeds: [cancelled], components: [disabledrow] })
                        return;

                    }
                })


            } catch (error) {
                console.log(error)
            }

        } else if (data) {
            const m = await message.channel.send({ embeds: [confirmation], components: [confirmrow] })
            const filter = (b) => { if (b.user.id === message.author.id) return true; return b.reply({ content: "<:Ikix:904736839036993586> This confirmation is not for you.", ephemeral: true }) };
            let collector = await m.createMessageComponentCollector({ filter: filter, time: 120000, max: 1 });

            collector.on('collect', async (i) => {
                i.deferUpdate()
                if (i.customId === 'yes') {
                    await data.updateOne({ welcomeChannel: channel })
                    await m.edit({ embeds: [confirmed], components: [disabledrow] })
                    return;
                }
                else if (i.customId === 'no') {
                    await m.edit({ embeds: [cancelled], components: [disabledrow] })
                    return;

                }
            })
            collector.on('end', (mes, r) => {
                if (r == 'time') {
                    m.edit({
                        components: [disabled],
                    })
                }
            })
        }
    }
})   