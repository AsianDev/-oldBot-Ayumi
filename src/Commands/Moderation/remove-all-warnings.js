
const Command = require('../../Handlers/Command.js')
const warndb = require('../../util/models/warndb.js');
const Discord = require('discord.js');

module.exports = new Command({
    name: "remove-all-warn",
    cooldown: 10000,
    description: "remove the warnings of someone",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["ADMINISTRATOR"],
    aliases: ["rwarnings", "remove-warns", "raw", "remove-allwarns"],
    async run(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("*Bakaa~* you didnt mention a user in this server.")
        warndb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {

                const embed2 = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Warnings removed.")
                .setTimestamp()
                .setThumbnail(`${user.user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`<:tick:904736864076955738> Succesfully deleted the warnings of ${user}`)

                const LogRemovedWarns = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Warnings removed.")
                .setTimestamp()
                .setThumbnail(`${user.user.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`<:tick:904736864076955738> Succesfully deleted all the warnings of ${user}`)

                await warndb.findOneAndDelete({
                    user: user.user.id,
                    guild: message.guild.id
                })
                
                message.channel.send({embeds: [embed2]})
                client.channels.cache.get("924889631303012363").send({embeds: [LogRemovedWarns]})

            } else {
                const embed = new Discord.MessageEmbed()
                .setDescription("<:x_:904736839036993586> **Waaa~** this user doesnt have any warnings.")
                .setColor("RED")
                message.channel.send({embeds: [embed]})
                const DM = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`<:tick:904736864076955738> ${user} your warnings have been cleared from ${message.guild.name}`)
                user.send({embeds: [DM]})
        }})}})