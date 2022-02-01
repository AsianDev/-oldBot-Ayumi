const { Message, MessageEmbed } = require("discord.js")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

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
                .setAuthor({ text: message.author.tag })
                .setDescription("**<:x_:904736839036993586> Please Provide an ID for the Guild**")]
        })

        await guild.leave();
        message.channel.send(
          `Left **${guild.name}** with \`${guild.memberCount}\` members.`
        );

    }
})