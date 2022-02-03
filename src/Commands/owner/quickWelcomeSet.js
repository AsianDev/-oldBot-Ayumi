const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    name: "setqwelc",
    description: "set the suggestion channel to what you want it to be!",
    cooldown: 10000,
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],


    async run(message, args, client) {

        const guildConfig = require('../../util/models/guildConfig.js') // change it to the guild config schema directory

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription("ೃ⁀➷ The Welcome channel has been updated.ੈ✩‧₊˚")

        const errorEmbed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setDescription("*Waaa~~* Please mention a channel to set the welcome event.")

        const channel = message.mentions.channels.first()

        if (!channel) return message.reply({ embeds: [errorEmbed] })

        const data = await guildConfig.findOne({ guildId: message.guild.id })

        if (!data) {
            try {
                const data1 = await guildConfig.create({
                    guildId: message.guild.id
                })

                await data1.updateOne({ QuickwelcomeChannel: channel.id })
                return message.channel.send({ embeds: [embed] })
            } catch (error) {
                console.log(error)
            }
        } else if (data) {
            await data.updateOne({ QuickwelcomeChannel: channel.id })
            return message.channel.send({ embeds: [embed] })
        }
    }
})   