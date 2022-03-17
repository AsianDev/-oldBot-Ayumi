const { Message, MessageEmbed } = require("discord.js")
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
const c = require("../../config/assets/Json/colours.json")
module.exports = new Command({

    name: "leave",
    description: "leave a server",
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        const guild = client.guilds.cache.get(args[1]);
        if (!guild) return message.channel.send({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setAuthor({ name: message.author.tag, iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription("**<:x_:904736839036993586> Please Provide an ID for the Guild**")]
        })

        message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(c.pink)
            .addField("Server:", `__${guild.name}__`, true)
            .addField("Owner:", `<@${guild.ownerId}>`, true)
            .addField("MemberCount:", `__${guild.memberCount}__`, false)
            .setAuthor({name: `${client.user.tag}`,iconURL: `${client.user.displayAvatarURL()}`})
        ]})
        await guild.leave();
    }
})