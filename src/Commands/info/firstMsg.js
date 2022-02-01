const Discord = require('discord.js');
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "firstmsg",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    cooldown: 5000,
    description: "shows first msg of channel",
    async run(message, args, client) {

        const channel = message.mentions.channels.first() || message.channel
        const fetchMessages = await channel.messages.fetch({
            after: 1,
            limit: 1,
        });
        const msg = fetchMessages.first();

        const embed = new Discord.MessageEmbed()
            .setDescription(`**First Message in ${message.channel}**`)
            .setTitle(`${msg.author.username}`)
            .setColor("BLURPLE")
            .setFooter({ text: "Kaori©"})
            .addFields(
                { name: '**Content:**', value: `${msg.content}` },
                { name: '**Created At:**', value: `${msg.createdAt.toLocaleDateString()}` },
                { name: '**Message link**', value: `**[Jump the message](${msg.url})**` }

            )
        message.channel.send({ embeds: [embed] })
    }
})